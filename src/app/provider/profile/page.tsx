'use client';

import { useState } from 'react';
import ServiceCategorySelection from '@/app/components/provider/ServiceCategorySelection';
import SkillsExperienceForm from '@/app/components/provider/SkillsExperienceForm';
import BusinessInformationForm from '@/app/components/provider/BusinessInformationForm';
import AvailabilityCalendar from '@/app/components/provider/AvailabilityCalendar';

interface ServiceProviderProfile {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country: string;
  state: string;
  city: string;
  address?: string;
  zipCode?: string;
  serviceCategories: string[];
  skills?: Array<{name: string; level: string; years: number}>;
  experience?: number;
  certifications?: Array<{name: string; issuer: string; date: string}>;
  education?: string;
  businessName?: string;
  businessType?: string;
  licenseNumber?: string;
  licensingBody?: string;
  licenseExpiry?: string;
  insuranceProvider?: string;
  insurancePolicy?: string;
  insuranceExpiry?: string;
  bondedAmount?: number;
  availability?: Record<string, unknown>;
  timeZone: string;
  bio?: string;
}

export default function ProviderProfilePage() {
  const [profile, setProfile] = useState<ServiceProviderProfile>({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    state: '',
    city: '',
    serviceCategories: [],
    timeZone: 'America/New_York'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const steps = [
    { id: 1, title: 'Service Categories', component: 'categories' },
    { id: 2, title: 'Skills & Experience', component: 'skills' },
    { id: 3, title: 'Business Information', component: 'business' },
    { id: 4, title: 'Availability', component: 'availability' }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setStatus('');
    
    try {
      const response = await fetch('/api/provider/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      setStatus('success');
    } catch (error) {
      console.error('Error saving profile:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep - 1].component) {
      case 'categories':
        return (
          <ServiceCategorySelection
            selectedCategories={profile.serviceCategories}
            onChange={(categories) => setProfile(prev => ({ ...prev, serviceCategories: categories }))}
          />
        );
      case 'skills':
        return (
          <SkillsExperienceForm
            profile={profile}
            onChange={(updates) => setProfile(prev => ({ ...prev, ...updates }))}
          />
        );
      case 'business':
        return (
          <BusinessInformationForm
            profile={profile}
            onChange={(updates) => setProfile(prev => ({ ...prev, ...updates }))}
          />
        );
      case 'availability':
        return (
          <AvailabilityCalendar
            availability={profile.availability}
            timeZone={profile.timeZone}
            onChange={(availability, timeZone) => setProfile(prev => ({ 
              ...prev, 
              availability, 
              timeZone 
            }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Service Provider Profile</h1>
            <p className="text-gray-600 mt-1">Complete your profile to start offering services</p>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`ml-4 w-16 h-1 ${
                        currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="px-6 py-6">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            )}
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="px-6 py-4 bg-green-50 border-t border-green-200">
              <p className="text-green-800">Profile saved successfully!</p>
            </div>
          )}
          {status === 'error' && (
            <div className="px-6 py-4 bg-red-50 border-t border-red-200">
              <p className="text-red-800">Error saving profile. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}