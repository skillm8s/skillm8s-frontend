'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchFilters, searchServices, debounce } from '@/lib/searchUtils';
import { mockServices } from '@/lib/mockData';
import SearchFiltersComponent from '@/app/components/search/SearchFilters';
import SearchResults from '@/app/components/search/SearchResults';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    priceRange: 'all',
    availability: 'all',
    sortBy: 'relevance',
    userLocation: undefined // Will be set if user allows geolocation
  });
  const [results, setResults] = useState(searchServices(mockServices, filters));
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchFilters: SearchFilters) => {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const searchResults = searchServices(mockServices, searchFilters);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    }, 300),
    [] // Empty dependency array since debounce creates a stable function
  );

  // Handle filter changes
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  // Handle search input change
  const handleSearchInputChange = (query: string) => {
    setSearchQuery(query);
    const newFilters = { ...filters, query };
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    const newFilters = { ...filters, query: suggestion };
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  // Handle booking
  const handleBookService = (serviceId: string) => {
    // For now, just show an alert. In a real app, this would navigate to booking flow
    alert(`Booking service ${serviceId}. This would normally open the booking flow.`);
  };

  // Get user location for distance calculation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          const newFilters = { ...filters, userLocation: location };
          setFilters(newFilters);
          setResults(searchServices(mockServices, newFilters));
        },
        (error) => {
          console.log('Location access denied:', error);
          // Continue without location
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Initial search on page load
  useEffect(() => {
    if (searchParams.get('q')) {
      debouncedSearch(filters);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Local Services
          </h1>
          <p className="text-lg text-gray-600">
            Discover trusted professionals in your area for all your home service needs
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              placeholder="Search for services, categories, or locations..."
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
          </div>
          
          {userLocation && (
            <div className="mt-2 flex items-center text-sm text-green-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location detected - showing distances
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <SearchFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                resultCount={results.length}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <SearchResults
              results={results}
              query={filters.query}
              isLoading={isLoading}
              onBookService={handleBookService}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading search...</p>
      </div>
    </div>}>
      <SearchPageContent />
    </Suspense>
  );
}