'use client';

import { useEffect, useState } from 'react';

const tools = [
  { icon: '🔨', name: 'Repairs' },
  { icon: '🎨', name: 'Painting' },
  { icon: '🪛', name: 'Installation' },
  { icon: '⚡', name: 'Electrical' },
  { icon: '🚿', name: 'Plumbing' },
  { icon: '🌿', name: 'Gardening' },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -left-4 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-xl"></div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-100/50 rounded-full blur-xl"></div>

            {/* Pre-heading badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="flex items-center text-sm font-medium text-red-900">
                <span className="flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Launching Soon! 🚀
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="relative">
              <div className="text-5xl lg:text-7xl font-bold mb-4 flex flex-wrap items-center gap-x-4">
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">Uber</span>
                
                </span>
                <span className="text-gray-900">Transformed</span>
                <span className="text-gray-900">Rides</span>
              </div>

              <div className="relative mt-2">
                <div className="text-5xl lg:text-7xl font-bold flex flex-wrap items-center gap-x-4">
                  <span className="text-gray-900">We</span>
                  <span className="relative">
                    <span className="text-gray-900">Transform</span>
                    
                  </span>
                  <div className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                      Home Services
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 rounded-full animate-expand"></div>
                  </div>
                </div>
              </div>
            </h1>

            {/* Description */}
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              Connect with verified professionals for all your home services. 
              Smart matching, real-time tracking, and guaranteed quality.
            </p>

            {/* CTA Section */}
            {/* <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-200"
              >
                Join Waitlist
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              
              {/* Social Proof */}
              {/*  
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-blue-50 flex items-center justify-center text-sm shadow-sm">
                      👤
                    </div>
                  ))}
                </div>
                <span className="font-medium"></span>
              </div>
            </div> */}

            {/* Features Grid */}
            <div className="mt-12 grid grid-cols-2 gap-4">
              {['Instant Booking', 'Verified Pros', '24/7 Support', 'Best Prices'].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Services Grid */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-white/50 backdrop-blur-sm p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-xl">
              <div className="grid grid-cols-2 gap-4 h-full">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
                    style={{
                      transform: `translateY(${scrollY * 0.1 * (index % 2)}px)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-200">
                        {tool.icon}
                      </div>
                      <div className="text-gray-600 text-sm font-medium">{tool.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-lg transform -rotate-6 animate-float-slow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-black">Trusted Service</p>
                  <p className="text-sm text-gray-500">4.9/5 rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}