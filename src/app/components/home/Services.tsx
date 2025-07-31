'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceCategory } from '@/lib/categories';

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (response.ok) {
        setCategories(data.categories);
      } else {
        console.error('Failed to fetch categories:', data.error);
        // Fallback to static data if API fails
        const { defaultCategories } = await import('@/lib/categories');
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to static data if API fails
      const { defaultCategories } = await import('@/lib/categories');
      setCategories(defaultCategories);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Home Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Loading service categories...
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Home Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of professional home services, from routine maintenance 
            to specialized improvements, all delivered by verified experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link href={`/services/${category.slug}`} key={category.id}>
              <div
                className="relative group h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.accent} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  <div className="space-y-3">
                    {category.subcategories.slice(0, 3).map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className={`flex items-center gap-2 transition-all duration-300 ${
                          hoveredIndex === index ? 'transform translate-x-2' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.accent}`} />
                        <span className="text-gray-600">{subcategory.name}</span>
                      </div>
                    ))}
                    {category.subcategories.length > 3 && (
                      <div className="text-sm text-gray-500 italic">
                        +{category.subcategories.length - 3} more
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.accent} text-white shadow-lg transform hover:scale-110 transition-all duration-300`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}