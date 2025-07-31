'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  duration: number;
}

interface BookingData {
  serviceId: string;
  providerId: string;
  date: string;
  time: string;
  address: string;
  addressLat?: number;
  addressLng?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requirements: string;
}

interface BookingDetailsFormProps {
  service: Service;
  bookingData: Partial<BookingData>;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function BookingDetailsForm({
  service,
  bookingData,
  updateBookingData,
  onNext,
  onPrev,
}: BookingDetailsFormProps) {
  const [formData, setFormData] = useState({
    customerName: bookingData.customerName || '',
    customerEmail: bookingData.customerEmail || '',
    customerPhone: bookingData.customerPhone || '',
    requirements: bookingData.requirements || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Pre-fill form if data exists
    setFormData({
      customerName: bookingData.customerName || '',
      customerEmail: bookingData.customerEmail || '',
      customerPhone: bookingData.customerPhone || '',
      requirements: bookingData.requirements || '',
    });
  }, [bookingData.customerName, bookingData.customerEmail, bookingData.customerPhone, bookingData.requirements]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Full name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }

    // Validate phone (optional but if provided, should be valid)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (formData.customerPhone.trim() && !phoneRegex.test(formData.customerPhone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.customerPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      updateBookingData(formData);
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Booking Details
      </h2>

      <div className="space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.customerName ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.customerEmail ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.customerEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange('customerPhone', e.target.value)}
              placeholder="Enter your phone number"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.customerPhone ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.customerPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
            )}
          </div>
        </div>

        {/* Service Requirements */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Requirements</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements or Instructions (Optional)
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="Please describe any specific requirements, access instructions, or special considerations for the service..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="mt-2 text-sm text-gray-500">
              Example: Access codes, parking instructions, specific areas of focus, etc.
            </p>
          </div>
        </div>

        {/* Service Summary */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Service Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Category:</span>
              <span>{service.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span>{service.duration} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium text-green-600">${service.basePrice}</span>
            </div>
            {bookingData.date && (
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{new Date(bookingData.date).toLocaleDateString()}</span>
              </div>
            )}
            {bookingData.time && (
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span>{bookingData.time}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Review Booking
        </button>
      </div>
    </div>
  );
}