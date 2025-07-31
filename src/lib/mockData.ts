export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  shortDescription: string;
  price: number;
  priceUnit: 'hour' | 'fixed' | 'sqft' | 'linear_ft';
  rating: number;
  reviewCount: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    lat: number;
    lng: number;
  };
  availability: 'available' | 'busy' | 'unavailable';
  nextAvailable: string; // ISO date string
  image: string;
  verified: boolean;
  responseTime: number; // hours
  completedJobs: number;
  tags: string[];
  features: string[];
}

// Mock data for different cities
export const mockServices: ServiceProvider[] = [
  // Lawn Care Services
  {
    id: '1',
    name: 'Green Thumb Landscaping',
    category: 'outdoor-services',
    subCategory: 'Lawn Care',
    description: 'Professional lawn mowing, edging, and maintenance services. We provide comprehensive yard care including fertilization, weed control, and seasonal cleanup.',
    shortDescription: 'Professional lawn mowing and maintenance',
    price: 45,
    priceUnit: 'hour',
    rating: 4.8,
    reviewCount: 127,
    location: {
      address: '123 Maple St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      lat: 30.2672,
      lng: -97.7431
    },
    availability: 'available',
    nextAvailable: '2024-08-01T09:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 2,
    completedJobs: 89,
    tags: ['lawn mowing', 'edging', 'yard cleanup'],
    features: ['Same-day service', 'Equipment included', 'Insured']
  },
  {
    id: '2',
    name: 'Precision Lawn Pro',
    category: 'outdoor-services',
    subCategory: 'Lawn Care',
    description: 'Expert lawn care with precision cutting and professional edge trimming. Specializing in residential and commercial properties.',
    shortDescription: 'Expert lawn care and precision cutting',
    price: 35,
    priceUnit: 'hour',
    rating: 4.6,
    reviewCount: 83,
    location: {
      address: '456 Oak Ave',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      lat: 32.7767,
      lng: -96.7970
    },
    availability: 'busy',
    nextAvailable: '2024-08-03T08:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 4,
    completedJobs: 156,
    tags: ['lawn mowing', 'commercial', 'residential'],
    features: ['Weekly service', 'Equipment included', 'Licensed']
  },
  // Plumbing Services
  {
    id: '3',
    name: 'Rapid Plumbing Solutions',
    category: 'core-systems',
    subCategory: 'Plumbing',
    description: 'Emergency and routine plumbing services including leak repairs, drain cleaning, and fixture installation. Available 24/7 for urgent issues.',
    shortDescription: '24/7 emergency and routine plumbing',
    price: 95,
    priceUnit: 'hour',
    rating: 4.9,
    reviewCount: 234,
    location: {
      address: '789 Pine Rd',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      lat: 29.7604,
      lng: -95.3698
    },
    availability: 'available',
    nextAvailable: '2024-08-01T10:30:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 1,
    completedJobs: 312,
    tags: ['emergency plumbing', 'drain cleaning', 'leak repair'],
    features: ['24/7 service', 'Licensed plumber', 'Warranty included']
  },
  {
    id: '4',
    name: 'Master Pipe Works',
    category: 'core-systems',
    subCategory: 'Plumbing',
    description: 'Comprehensive plumbing services for homes and businesses. Specializing in pipe installation, water heater repair, and bathroom renovations.',
    shortDescription: 'Comprehensive residential and commercial plumbing',
    price: 85,
    priceUnit: 'hour',
    rating: 4.7,
    reviewCount: 178,
    location: {
      address: '321 Cedar St',
      city: 'San Antonio',
      state: 'TX',
      zipCode: '78201',
      lat: 29.4241,
      lng: -98.4936
    },
    availability: 'available',
    nextAvailable: '2024-08-01T14:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 3,
    completedJobs: 267,
    tags: ['water heater', 'pipe installation', 'bathroom renovation'],
    features: ['Free estimates', 'Licensed', 'Insured']
  },
  // House Cleaning
  {
    id: '5',
    name: 'Sparkle Clean Services',
    category: 'cleaning-services',
    subCategory: 'House Cleaning',
    description: 'Professional residential cleaning services including deep cleaning, regular maintenance, and move-in/move-out cleaning.',
    shortDescription: 'Professional residential cleaning services',
    price: 120,
    priceUnit: 'fixed',
    rating: 4.8,
    reviewCount: 195,
    location: {
      address: '654 Elm St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78702',
      lat: 30.2849,
      lng: -97.7341
    },
    availability: 'available',
    nextAvailable: '2024-08-02T09:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 6,
    completedJobs: 423,
    tags: ['deep cleaning', 'regular cleaning', 'move-out cleaning'],
    features: ['Eco-friendly products', 'Bonded & insured', 'Satisfaction guarantee']
  },
  // Power Washing
  {
    id: '6',
    name: 'Pressure Pro Cleaning',
    category: 'exterior-maintenance',
    subCategory: 'Power Washing',
    description: 'High-pressure cleaning for driveways, decks, siding, and roofs. Professional equipment and eco-friendly cleaning solutions.',
    shortDescription: 'Professional pressure washing services',
    price: 0.15,
    priceUnit: 'sqft',
    rating: 4.5,
    reviewCount: 92,
    location: {
      address: '987 Birch Ln',
      city: 'Fort Worth',
      state: 'TX',
      zipCode: '76101',
      lat: 32.7555,
      lng: -97.3308
    },
    availability: 'available',
    nextAvailable: '2024-08-01T11:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 8,
    completedJobs: 145,
    tags: ['pressure washing', 'deck cleaning', 'driveway cleaning'],
    features: ['Eco-friendly', 'Professional equipment', 'Free quotes']
  },
  // Interior Painting
  {
    id: '7',
    name: 'Perfect Paint Professionals',
    category: 'interior-maintenance',
    subCategory: 'Painting',
    description: 'Interior and exterior painting services with premium materials and expert craftsmanship. Color consultation included.',
    shortDescription: 'Professional interior and exterior painting',
    price: 3.50,
    priceUnit: 'sqft',
    rating: 4.9,
    reviewCount: 156,
    location: {
      address: '147 Walnut Dr',
      city: 'Plano',
      state: 'TX',
      zipCode: '75023',
      lat: 33.0198,
      lng: -96.6989
    },
    availability: 'busy',
    nextAvailable: '2024-08-05T08:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 12,
    completedJobs: 89,
    tags: ['interior painting', 'exterior painting', 'color consultation'],
    features: ['Premium materials', 'Color consultation', 'Warranty included']
  },
  // HVAC Services
  {
    id: '8',
    name: 'Cool Air Experts',
    category: 'core-systems',
    subCategory: 'HVAC',
    description: 'Complete HVAC services including installation, repair, and maintenance. Emergency service available for heating and cooling systems.',
    shortDescription: 'Complete HVAC installation and repair',
    price: 125,
    priceUnit: 'hour',
    rating: 4.7,
    reviewCount: 203,
    location: {
      address: '258 Spruce St',
      city: 'Arlington',
      state: 'TX',
      zipCode: '76010',
      lat: 32.7357,
      lng: -97.1081
    },
    availability: 'available',
    nextAvailable: '2024-08-01T13:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 2,
    completedJobs: 298,
    tags: ['AC repair', 'heating', 'installation', 'maintenance'],
    features: ['24/7 emergency', 'Licensed technicians', 'Warranty']
  },
  // Tree Services
  {
    id: '9',
    name: 'Tree Masters LLC',
    category: 'outdoor-services',
    subCategory: 'Tree Services',
    description: 'Professional tree removal, trimming, and stump grinding. Certified arborists with full insurance coverage.',
    shortDescription: 'Professional tree removal and trimming',
    price: 85,
    priceUnit: 'hour',
    rating: 4.6,
    reviewCount: 134,
    location: {
      address: '369 Poplar Ave',
      city: 'Garland',
      state: 'TX',
      zipCode: '75040',
      lat: 32.9126,
      lng: -96.6389
    },
    availability: 'available',
    nextAvailable: '2024-08-02T07:00:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 24,
    completedJobs: 167,
    tags: ['tree removal', 'trimming', 'stump grinding', 'emergency'],
    features: ['Certified arborists', 'Fully insured', 'Emergency service']
  },
  // Electrical Services
  {
    id: '10',
    name: 'Bright Electric Solutions',
    category: 'core-systems',
    subCategory: 'Electrical',
    description: 'Licensed electricians providing installation, repair, and upgrade services. Specializing in residential and light commercial work.',
    shortDescription: 'Licensed electrical installation and repair',
    price: 95,
    priceUnit: 'hour',
    rating: 4.8,
    reviewCount: 167,
    location: {
      address: '741 Maple Ridge Dr',
      city: 'Irving',
      state: 'TX',
      zipCode: '75038',
      lat: 32.8140,
      lng: -96.9489
    },
    availability: 'available',
    nextAvailable: '2024-08-01T15:30:00Z',
    image: '/api/placeholder/300/200',
    verified: true,
    responseTime: 4,
    completedJobs: 245,
    tags: ['electrical repair', 'installation', 'outlets', 'lighting'],
    features: ['Licensed electricians', 'Code compliant', 'Warranty']
  }
];

// Categories for filtering
export const serviceCategories = [
  { id: 'all', name: 'All Services', slug: 'all' },
  { id: 'outdoor-services', name: 'Outdoor & Yard Services', slug: 'outdoor-services' },
  { id: 'exterior-maintenance', name: 'Exterior Maintenance', slug: 'exterior-maintenance' },
  { id: 'core-systems', name: 'Core Home Systems', slug: 'core-systems' },
  { id: 'interior-maintenance', name: 'Interior Maintenance', slug: 'interior-maintenance' },
  { id: 'cleaning-services', name: 'Cleaning Services', slug: 'cleaning-services' },
  { id: 'specialized-services', name: 'Specialized Services', slug: 'specialized-services' },
  { id: 'home-improvement', name: 'Home Improvement', slug: 'home-improvement' },
  { id: 'assessment-services', name: 'Assessment Services', slug: 'assessment-services' }
];

// Price ranges for filtering
export const priceRanges = [
  { id: 'all', name: 'All Prices', min: 0, max: Infinity },
  { id: 'budget', name: '$25-50/hr', min: 25, max: 50 },
  { id: 'moderate', name: '$50-100/hr', min: 50, max: 100 },
  { id: 'premium', name: '$100+/hr', min: 100, max: Infinity }
];

// Availability options
export const availabilityOptions = [
  { id: 'all', name: 'All' },
  { id: 'available', name: 'Available Now' },
  { id: 'busy', name: 'Busy' },
  { id: 'unavailable', name: 'Unavailable' }
];

// Sort options
export const sortOptions = [
  { id: 'relevance', name: 'Best Match' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Highest Rated' },
  { id: 'distance', name: 'Nearest First' }
];