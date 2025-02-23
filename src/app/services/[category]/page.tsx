'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Define the service data structure
const serviceData = {
  'outdoor-services': {
    title: "Outdoor & Yard Services",
    description: "Complete outdoor maintenance and landscaping solutions for your property",
    accent: "from-green-500 to-emerald-500",
    services: [
      {
        title: "Lawn Care",
        items: [
          "Lawn Mowing & Edging",
          "Lawn Aeration & Seeding",
          "Lawn Fertilization & Weed Control",
          "Yard Clean-Up"
        ]
      },
      {
        title: "Landscaping",
        items: [
          "Garden Maintenance",
          "Landscaping Design",
          "Hedge & Shrub Trimming",
          "Mulching & Fertilizing"
        ]
      },
      {
        title: "Tree Services",
        items: [
          "Tree Trimming & Pruning",
          "Tree Removal",
          "Stump Grinding",
          "Emergency Tree Service"
        ]
      },
      {
        title: "Seasonal Services",
        items: [
          "Leaf Removal",
          "Snow Plowing",
          "Ice Removal",
          "De-icing Services"
        ]
      },
      {
        title: "Irrigation",
        items: [
          "Sprinkler Installation",
          "System Maintenance",
          "Repair Services",
          "Winterization"
        ]
      }
    ]
  },
  // Add other categories similarly...
  'exterior-maintenance': {
    title: "Exterior Home Maintenance",
    description: "Keep your home's exterior in perfect condition",
    accent: "from-blue-500 to-indigo-500",
    services: [
      {
        title: "Power Washing",
        items: [
            "House Washing",
            "Deck Cleaning",
            "Fence Washing",
            "Gutter Cleaning"
        ]
      },
      
      {
        title: "Gutter Services",
        items: [
            "Gutter Cleaning",
            "Gutter Repair",
            "Gutter Installation"
        ]
      },
      {
        title: "Exterior Painting",
        items: [
            "Exterior Painting",
            "Exterior Staining"
        ]
      },
      {
        title: "Exterior Repair",
        items: [
            "Exterior Repair",
            "Exterior Maintenance"
        ]
      },
      {
        title: "Exterior Maintenance",
        items: [
            "Exterior Maintenance",
            "Exterior Cleaning"
        ]
      },
      {
        title: "Exterior Installation",
        items: [
            "Exterior Installation",
            "Exterior Installation"
        ]
      },
      {
        title: "Exterior Inspection",
        items: [
            "Exterior Inspection",
            "Exterior Inspection"
        ]
      }
    ]
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const categoryData = serviceData[category as keyof typeof serviceData];
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <Link href="/services" className="text-blue-500 hover:underline mt-4 block">
            Return to Services
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
            href="/services" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {categoryData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {categoryData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.services.map((service, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryData.accent} flex items-center justify-center mb-6`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {service.title}
                </h3>

                <ul className="space-y-4">
                  {service.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        hoveredService === index ? 'transform translate-x-2' : ''
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryData.accent}`} />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  className={`mt-8 w-full py-3 px-6 rounded-xl bg-gradient-to-r ${categoryData.accent} text-white font-semibold hover:opacity-90 transition-opacity duration-300`}
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 