'use client';

import { useState } from 'react';
import RegisterForm from '@/app/components/auth/RegisterForm';

export default function RegisterPage() {
  const [userType, setUserType] = useState<'CUSTOMER' | 'PROVIDER' | null>(null);

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Account Type
            </h2>
            <p className="text-gray-600 mb-8">
              Select how you'd like to use SkillM8s
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setUserType('CUSTOMER')}
              className="w-full p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
                  <p className="text-gray-600 text-sm">I need home services and want to hire professionals</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setUserType('PROVIDER')}
              className="w-full p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Service Provider</h3>
                  <p className="text-gray-600 text-sm">I offer home services and want to find customers</p>
                </div>
              </div>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => setUserType(null)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-6 text-center">
          <button
            onClick={() => setUserType(null)}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Change account type
          </button>
        </div>
        <RegisterForm userType={userType} />
      </div>
    </div>
  );
}