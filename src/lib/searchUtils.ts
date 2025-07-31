import { ServiceProvider } from './mockData';

export interface SearchFilters {
  query: string;
  category: string;
  priceRange: string;
  availability: string;
  sortBy: string;
  userLocation?: {
    lat: number;
    lng: number;
  };
}

export interface SearchResult extends ServiceProvider {
  distance?: number; // in miles
  matchScore?: number; // relevance score 0-1
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Calculate relevance score based on search query
function calculateRelevanceScore(service: ServiceProvider, query: string): number {
  if (!query.trim()) return 1;

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  const searchableText = [
    service.name,
    service.category,
    service.subCategory,
    service.description,
    service.shortDescription,
    ...service.tags,
    ...service.features,
    service.location.city,
    service.location.state
  ].join(' ').toLowerCase();

  let score = 0;
  let maxScore = 0;

  searchTerms.forEach(term => {
    maxScore += 1;
    
    // Exact matches in important fields get higher scores
    if (service.name.toLowerCase().includes(term)) score += 0.9;
    else if (service.subCategory.toLowerCase().includes(term)) score += 0.8;
    else if (service.tags.some(tag => tag.toLowerCase().includes(term))) score += 0.7;
    else if (service.category.toLowerCase().includes(term)) score += 0.6;
    else if (service.description.toLowerCase().includes(term)) score += 0.5;
    else if (service.features.some(feature => feature.toLowerCase().includes(term))) score += 0.4;
    else if (service.location.city.toLowerCase().includes(term)) score += 0.3;
    else if (searchableText.includes(term)) score += 0.2;
  });

  return maxScore > 0 ? score / maxScore : 0;
}

// Get price per hour equivalent for comparison
function getPricePerHour(service: ServiceProvider): number {
  switch (service.priceUnit) {
    case 'hour':
      return service.price;
    case 'fixed':
      return service.price / 2; // Assume 2 hours for fixed price comparison
    case 'sqft':
      return service.price * 100; // Assume 100 sqft for comparison
    case 'linear_ft':
      return service.price * 50; // Assume 50 linear ft for comparison
    default:
      return service.price;
  }
}

// Filter services based on criteria
export function filterServices(
  services: ServiceProvider[],
  filters: SearchFilters
): SearchResult[] {
  let filteredServices: SearchResult[] = services.map(service => ({
    ...service,
    matchScore: calculateRelevanceScore(service, filters.query)
  }));

  // Filter by search query (only include services with relevance score > 0 if query exists)
  if (filters.query.trim()) {
    filteredServices = filteredServices.filter(service => 
      (service.matchScore || 0) > 0
    );
  }

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filteredServices = filteredServices.filter(service => 
      service.category === filters.category
    );
  }

  // Filter by availability
  if (filters.availability && filters.availability !== 'all') {
    filteredServices = filteredServices.filter(service => 
      service.availability === filters.availability
    );
  }

  // Filter by price range
  if (filters.priceRange && filters.priceRange !== 'all') {
    const priceRanges: Record<string, { min: number; max: number }> = {
      'budget': { min: 25, max: 50 },
      'moderate': { min: 50, max: 100 },
      'premium': { min: 100, max: Infinity }
    };

    const range = priceRanges[filters.priceRange];
    if (range) {
      filteredServices = filteredServices.filter(service => {
        const pricePerHour = getPricePerHour(service);
        return pricePerHour >= range.min && pricePerHour <= range.max;
      });
    }
  }

  // Calculate distances if user location is provided
  if (filters.userLocation) {
    filteredServices = filteredServices.map(service => ({
      ...service,
      distance: calculateDistance(
        filters.userLocation!.lat,
        filters.userLocation!.lng,
        service.location.lat,
        service.location.lng
      )
    }));
  }

  return filteredServices;
}

// Sort services based on criteria
export function sortServices(services: SearchResult[], sortBy: string): SearchResult[] {
  const sortedServices = [...services];

  switch (sortBy) {
    case 'price-low':
      return sortedServices.sort((a, b) => getPricePerHour(a) - getPricePerHour(b));
    
    case 'price-high':
      return sortedServices.sort((a, b) => getPricePerHour(b) - getPricePerHour(a));
    
    case 'rating':
      return sortedServices.sort((a, b) => {
        // Sort by rating first, then by review count as tiebreaker
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviewCount - a.reviewCount;
      });
    
    case 'distance':
      return sortedServices.sort((a, b) => {
        if (a.distance === undefined && b.distance === undefined) return 0;
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
    
    case 'relevance':
    default:
      return sortedServices.sort((a, b) => {
        // Sort by relevance score first
        const scoreA = a.matchScore || 0;
        const scoreB = b.matchScore || 0;
        if (scoreB !== scoreA) {
          return scoreB - scoreA;
        }
        // Then by rating as secondary sort
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        // Then by review count as tertiary sort
        return b.reviewCount - a.reviewCount;
      });
  }
}

// Search services with filters and sorting
export function searchServices(
  services: ServiceProvider[],
  filters: SearchFilters
): SearchResult[] {
  const filtered = filterServices(services, filters);
  return sortServices(filtered, filters.sortBy);
}

// Get search suggestions for empty results
export function getSearchSuggestions(
  services: ServiceProvider[],
  query: string
): string[] {
  const suggestions: string[] = [];
  
  // Extract unique categories, subcategories, and common tags
  const categories = [...new Set(services.map(s => s.subCategory))];
  const tags = [...new Set(services.flatMap(s => s.tags))];
  const cities = [...new Set(services.map(s => s.location.city))];
  
  // Add suggestions based on partial matches
  if (query.length > 2) {
    const queryLower = query.toLowerCase();
    
    categories.forEach(category => {
      if (category.toLowerCase().includes(queryLower) && !suggestions.includes(category)) {
        suggestions.push(category);
      }
    });
    
    tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower) && !suggestions.includes(tag)) {
        suggestions.push(tag);
      }
    });
    
    cities.forEach(city => {
      if (city.toLowerCase().includes(queryLower) && !suggestions.includes(city)) {
        suggestions.push(city);
      }
    });
  }
  
  // If no suggestions found, provide popular services
  if (suggestions.length === 0) {
    suggestions.push(
      'Lawn Care',
      'Plumbing',
      'House Cleaning',
      'HVAC',
      'Electrical',
      'Painting'
    );
  }
  
  return suggestions.slice(0, 6);
}

// Debounce function for search input
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}