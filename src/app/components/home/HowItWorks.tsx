'use client';

import { useState } from 'react';

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('user');

  const userSteps = [
    {
      phase: "Registration",
      icon: "📱",
      title: "Quick Setup",
      steps: [
        "Download SkillM8s App",
        "Create your account",
        "Add payment method",
        "Set your service location"
      ]
    },
    {
      phase: "Booking",
      icon: "🔍",
      title: "Find & Book",
      steps: [
        "Browse available services",
        "Select service type",
        "View provider profiles",
        "Check ratings & reviews",
        "Request service"
      ]
    },
    {
      phase: "Service",
      icon: "✅",
      title: "Get Service",
      steps: [
        "Track provider location",
        "Receive professional service",
        "Pay securely through app",
        "Rate your experience"
      ]
    }
  ];

  const providerSteps = [
    {
      phase: "Registration",
      icon: "📋",
      title: "Join SkillM8s",
      steps: [
        "Download provider app",
        "Complete registration",
        "Identity verification",
        "Background check",
        "Upload certifications"
      ]
    },
    {
      phase: "Setup",
      icon: "⚙️",
      title: "Setup Profile",
      steps: [
        "Create business profile",
        "Set services & pricing",
        "Define service areas",
        "Set availability",
        "Await verification"
      ]
    },
    {
      phase: "Active",
      icon: "💪",
      title: "Start Earning",
      steps: [
        "Receive job requests",
        "Accept/decline jobs",
        "Complete services",
        "Get secure payments",
        "Build your ratings"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How SkillM8s Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, transparent, and efficient process for both customers and service providers
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('user')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'user'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              For Customers
            </button>
            <button
              onClick={() => setActiveTab('provider')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'provider'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              For Service Providers
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(activeTab === 'user' ? userSteps : providerSteps).map((section, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute -top-4 left-6 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <span className="text-2xl">{section.icon}</span>
              </div>
              
              <div className="mt-8">
                <span className="text-sm font-medium text-blue-600">
                  Phase {index + 1}: {section.phase}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-sm">{stepIndex + 1}</span>
                      </div>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}