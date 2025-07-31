'use client';

import { useState } from 'react';
import Link from 'next/link';

const serviceCategories = [
  {
    icon: "🌿",
    title: "Outdoor & Yard Services",
    description: "Complete outdoor maintenance and landscaping solutions",
    features: ["Lawn Care", "Tree Services", "Landscaping"],
    accent: "from-green-500 to-emerald-500",
    slug: "outdoor-services"
  },
  {
    icon: "🏠",
    title: "Exterior Home Maintenance",
    description: "Keep your home's exterior in perfect condition",
    features: ["Power Washing", "Gutter Services", "Exterior Repairs"],
    accent: "from-blue-500 to-indigo-500",
    slug: "exterior-maintenance"
  },
  {
    icon: "🔧",
    title: "Core Home Systems",
    description: "Expert HVAC, plumbing, and electrical services",
    features: ["Plumbing", "HVAC", "Electrical"],
    accent: "from-purple-500 to-pink-500",
    slug: "core-systems"
  },
  {
    icon: "🎨",
    title: "Interior Maintenance",
    description: "Complete interior repair and maintenance solutions",
    features: ["Painting", "Flooring", "General Repairs"],
    accent: "from-orange-500 to-red-500",
    slug: "interior-maintenance"
  },
  {
    icon: "✨",
    title: "Cleaning Services",
    description: "Professional cleaning and organization services",
    features: ["House Cleaning", "Carpet Cleaning", "Organization"],
    accent: "from-teal-500 to-cyan-500",
    slug: "cleaning-services"
  },
  {
    icon: "🏊",
    title: "Specialized Services",
    description: "Specialized home maintenance and improvement",
    features: ["Pool Services", "Pest Control", "Moving Services"],
    accent: "from-yellow-500 to-amber-500",
    slug: "specialized-services"
  },
  {
    icon: "🏗️",
    title: "Home Improvement",
    description: "Upgrade your home with modern solutions",
    features: ["Smart Home", "Security", "Entertainment"],
    accent: "from-rose-500 to-pink-500",
    slug: "home-improvement"
  },
  {
    icon: "📋",
    title: "Assessment Services",
    description: "Professional home evaluation and inspections",
    features: ["Home Inspection", "Energy Audits", "System Analysis"],
    accent: "from-sky-500 to-blue-500",
    slug: "assessment-services"
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Home Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our wide range of professional home services, from routine maintenance 
            to specialized improvements, all delivered by verified experts.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-200 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search All Services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {serviceCategories.map((category, index) => (
            <Link href={`/services/${category.slug}`} key={index}>
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
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>

                  <div className="space-y-3">
                    {category.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className={`flex items-center gap-2 transition-all duration-300 ${
                          hoveredIndex === index ? 'transform translate-x-2' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.accent}`} />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
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