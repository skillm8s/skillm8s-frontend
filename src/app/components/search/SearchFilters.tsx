'use client';

import { SearchFilters } from '@/lib/searchUtils';
import { serviceCategories, priceRanges, availabilityOptions, sortOptions } from '@/lib/mockData';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  resultCount: number;
}

export default function SearchFiltersComponent({ filters, onFiltersChange, resultCount }: SearchFiltersProps) {
  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <span className="text-sm text-gray-500">{resultCount} services found</span>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {serviceCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.id} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value={range.id}
                  checked={filters.priceRange === range.id}
                  onChange={(e) => updateFilter('priceRange', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{range.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Availability
          </label>
          <div className="space-y-2">
            {availabilityOptions.map((option) => (
              <label key={option.id} className="flex items-center">
                <input
                  type="radio"
                  name="availability"
                  value={option.id}
                  checked={filters.availability === option.id}
                  onChange={(e) => updateFilter('availability', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => onFiltersChange({
            query: filters.query,
            category: 'all',
            priceRange: 'all',
            availability: 'all',
            sortBy: 'relevance',
            userLocation: filters.userLocation
          })}
          className="w-full py-2 px-4 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}