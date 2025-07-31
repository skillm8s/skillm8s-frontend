'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ServiceCategory, getCategoryBySlug } from '@/lib/categories';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [categoryData, setCategoryData] = useState<ServiceCategory | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const fetchCategoryData = async () => {
    try {
      setIsLoading(true);
      
      // Try to fetch from API first
      const response = await fetch(`/api/categories/${category}`);
      const data = await response.json();
      
      if (response.ok) {
        setCategoryData(data.category);
      } else {
        // Fallback to static data
        const categoryFromStatic = getCategoryBySlug(category);
        setCategoryData(categoryFromStatic || null);
      }
    } catch (error) {
      console.error('Error fetching category:', error);
      // Fallback to static data
      const categoryFromStatic = getCategoryBySlug(category);
      setCategoryData(categoryFromStatic || null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <Link href="/" className="text-blue-500 hover:underline mt-4 block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link 
            href="/#services" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
        </div>

        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${categoryData.accent} flex items-center justify-center`}>
              <span className="text-4xl">{categoryData.icon}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {categoryData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {categoryData.description}
          </p>
        </div>

        {categoryData.subcategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.subcategories
              .filter(subcategory => subcategory.isActive)
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((subcategory, index) => (
                <div
                  key={subcategory.id}
                  className="relative"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryData.accent} flex items-center justify-center mb-6`}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                      {subcategory.name}
                    </h3>

                    {subcategory.description && (
                      <p className="text-gray-600 mb-6">
                        {subcategory.description}
                      </p>
                    )}

                    <ul className="space-y-4 mb-8">
                      {subcategory.services
                        .filter(service => service.isActive)
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((service) => (
                          <li
                            key={service.id}
                            className={`flex items-center gap-3 transition-all duration-300 ${
                              hoveredService === index ? 'transform translate-x-2' : ''
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryData.accent}`} />
                            <span className="text-gray-600">{service.name}</span>
                          </li>
                        ))}
                    </ul>

                    <button 
                      className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${categoryData.accent} text-white font-semibold hover:opacity-90 transition-opacity duration-300`}
                    >
                      Book {subcategory.name}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Services Coming Soon
            </h3>
            <p className="text-gray-500">
              We&apos;re working on adding services to this category. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 