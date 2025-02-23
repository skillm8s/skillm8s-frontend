'use client';

import { useState } from 'react';

type UserType = 'customer' | 'provider' | '';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  userType: UserType;
  country: string;
  state: string;
  city: string;
  services: string[];
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    country: '',
    state: '',
    city: '',
    services: [],
  });
  const [status, setStatus] = useState('');

  const serviceCategories = [
    'Lawn & Garden',
    'Home Cleaning',
    'HVAC',
    'Plumbing',
    'Electrical',
    'Interior Repairs',
    'Exterior Maintenance',
    'Pool Services',
  ];

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Simulate API call
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        userType: '',
        country: '',
        state: '',
        city: '',
        services: [],
      });
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
    }
  };

  return (
    <div id="waitlist" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent text-3xl font-bold mb-4">
            Join Our Waitlist
          </h2>
          <p className="text-xl font-bold text-black mb-8">
            You&apos;ll be the first to know when SkillM8s launches in your area.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, userType: 'customer' }))}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.userType === 'customer'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-semibold text-black">I&apos;m a Customer</h3>
              <p className="text-sm text-gray-500">Looking for services</p>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, userType: 'provider' }))}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.userType === 'provider'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-semibold text-black">I&apos;m a Service Provider</h3>
              <p className="text-sm text-gray-500">Offering services</p>
            </button>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="First Name"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Last Name"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              placeholder="Country"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              placeholder="State"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              placeholder="City"
              className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Service Provider Specific Fields */}
          {formData.userType === 'provider' && (
            <div className="space-y-4">
              <label className="block font-semibold text-black mb-2">
                What services would you like to provide?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {serviceCategories.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceToggle(service)}
                    className={`p-3 text-sm font-semibold text-blue-500 rounded-lg border transition-all ${
                      formData.services.includes(service)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
          </button>

          {status === 'success' && (
            <p className="text-center text-green-600">Thanks for joining our waitlist!</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}