'use client';

import { useState } from 'react';
import CategoryManagement from './CategoryManagement';
import { ServiceCategory } from '@/lib/categories';

export default function AdminCategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                Categories
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{selectedCategory.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Details */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedCategory.accent} flex items-center justify-center`}>
                <span className="text-3xl">{selectedCategory.icon}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedCategory.name}</h1>
                <p className="text-gray-600">{selectedCategory.description}</p>
              </div>
            </div>
          </div>

          {/* Subcategories */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Subcategories ({selectedCategory.subcategories.length})
            </h2>
            
            {selectedCategory.subcategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedCategory.subcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {subcategory.description || 'No description available'}
                    </p>
                    <div className="text-xs text-gray-500">
                      <div>Services: {subcategory.services.length}</div>
                      <div>Sort Order: {subcategory.sortOrder}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📝</div>
                <p className="text-gray-500">No subcategories found</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Add Subcategory
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Service Category Management</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">SkillM8s Admin</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CategoryManagement onCategorySelect={setSelectedCategory} />
    </div>
  );
}