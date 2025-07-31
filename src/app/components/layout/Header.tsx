'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative flex items-center">
              {/* Animated Logo */}
              <div className="flex items-center space-x-2">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-blue-600 rounded-lg transform group-hover:rotate-45 transition-transform duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    🛠️
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                    SkillM8s
                  </span>
                  {/* <span className="text-xs text-gray-500 font-medium">Professional Services</span> */}
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Services', href: '#services' },
              { name: 'Search', href: '/search' },
              { name: 'How It Works', href: '#how-it-works' },
              { name: 'About', href: '#about' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="#waitlist"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-blue-200 font-medium"
            >
              Join Waitlist
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-2' : 'top-0'
              }`}></span>
              <span className={`absolute left-0 block w-full h-0.5 bg-gray-600 top-2 transition-all duration-200 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute left-0 block w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 top-2' : 'top-4'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-4">
            {[
              { name: 'Services', href: '#services' },
              { name: 'Search', href: '/search' },
              { name: 'How It Works', href: '#how-it-works' },
              { name: 'About', href: '#about' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#waitlist"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}