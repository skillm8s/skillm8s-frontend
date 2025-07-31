'use client';

import { SearchResult } from '@/lib/searchUtils';

interface ServiceCardProps {
  service: SearchResult;
  onBookService: (serviceId: string) => void;
}

export default function ServiceCard({ service, onBookService }: ServiceCardProps) {
  const formatPrice = (price: number, unit: string) => {
    switch (unit) {
      case 'hour':
        return `$${price}/hour`;
      case 'fixed':
        return `$${price} fixed`;
      case 'sqft':
        return `$${price}/sq ft`;
      case 'linear_ft':
        return `$${price}/linear ft`;
      default:
        return `$${price}`;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available Now';
      case 'busy':
        return 'Busy';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
            {service.verified && (
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-2">{service.shortDescription}</p>
          <p className="text-sm text-gray-500">{service.subCategory}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(service.availability)}`}>
          {getAvailabilityText(service.availability)}
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-900">{service.rating}</span>
          <span className="text-sm text-gray-500">({service.reviewCount} reviews)</span>
        </div>
        <div className="text-sm text-gray-500">
          {service.completedJobs} jobs completed
        </div>
      </div>

      {/* Location and Distance */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{service.location.city}, {service.location.state}</span>
        </div>
        {service.distance !== undefined && (
          <div className="text-sm text-gray-600">
            {service.distance.toFixed(1)} miles away
          </div>
        )}
      </div>

      {/* Features */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {service.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
            >
              {feature}
            </span>
          ))}
          {service.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
              +{service.features.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Price and Response Time */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(service.price, service.priceUnit)}
          </div>
          <div className="text-sm text-gray-500">
            Responds in {service.responseTime}h
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Next available:</div>
          <div className="text-sm font-medium text-gray-900">
            {new Date(service.nextAvailable).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onBookService(service.id)}
          disabled={service.availability === 'unavailable'}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
            service.availability === 'unavailable'
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:opacity-90 hover:scale-105'
          }`}
        >
          {service.availability === 'unavailable' ? 'Unavailable' : 'Book Service'}
        </button>
        <button className="py-3 px-4 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="py-3 px-4 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
}