'use client';

import { SearchResult } from '@/lib/searchUtils';
import { getSearchSuggestions } from '@/lib/searchUtils';
import { mockServices } from '@/lib/mockData';
import ServiceCard from './ServiceCard';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading: boolean;
  onBookService: (serviceId: string) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export default function SearchResults({ 
  results, 
  query, 
  isLoading, 
  onBookService,
  onSuggestionClick 
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded w-40"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    const suggestions = getSearchSuggestions(mockServices, query);
    
    return (
      <div className="text-center py-16">
        <div className="mb-8">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No services found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn&apos;t find any services matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>

        {suggestions.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Try searching for:</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              'Lawn Care',
              'Plumbing',
              'House Cleaning',
              'HVAC',
              'Electrical',
              'Painting'
            ].map((category, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(category)}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {results.length} service{results.length !== 1 ? 's' : ''} found
          </h2>
          {query && (
            <p className="text-gray-600">
              Showing results for &ldquo;<span className="font-medium">{query}</span>&rdquo;
            </p>
          )}
        </div>
      </div>

      {/* Service cards */}
      <div className="grid gap-6">
        {results.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onBookService={onBookService}
          />
        ))}
      </div>

      {/* Load more button (for future pagination) */}
      {results.length >= 10 && (
        <div className="text-center">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200">
            Load More Services
          </button>
        </div>
      )}
    </div>
  );
}