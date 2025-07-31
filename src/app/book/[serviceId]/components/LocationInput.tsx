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

interface LocationInputProps {
  service: Service;
  bookingData: Partial<BookingData>;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function LocationInput({
  bookingData,
  updateBookingData,
  onNext,
  onPrev,
}: LocationInputProps) {
  const [address, setAddress] = useState(bookingData.address || '');
  const [isValidating, setIsValidating] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(false);

  useEffect(() => {
    if (bookingData.address) {
      setAddress(bookingData.address);
      setIsValidAddress(true);
    }
  }, [bookingData.address]);

  const validateAddress = async (addressInput: string) => {
    if (!addressInput.trim()) {
      setAddressError('Address is required');
      setIsValidAddress(false);
      return;
    }

    setIsValidating(true);
    setAddressError('');

    try {
      const response = await fetch('/api/validate-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: addressInput }),
      });

      const result = await response.json();

      if (response.ok && result.isValid) {
        setIsValidAddress(true);
        setAddressError('');
        // Store the validated address with coordinates if available
        updateBookingData({
          address: result.formattedAddress || addressInput,
          addressLat: result.lat,
          addressLng: result.lng,
        });
      } else {
        setIsValidAddress(false);
        setAddressError(result.error || 'Invalid address. Please enter a valid service location.');
      }
    } catch (error) {
      console.error('Address validation error:', error);
      setAddressError('Unable to validate address. Please check your connection and try again.');
      setIsValidAddress(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setIsValidAddress(false);
    setAddressError('');
    
    // Clear previous validation results when user types
    if (bookingData.address) {
      updateBookingData({
        address: '',
        addressLat: undefined,
        addressLng: undefined,
      });
    }
  };

  const handleNext = () => {
    if (isValidAddress && address.trim()) {
      onNext();
    } else {
      validateAddress(address);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Service Location
      </h2>

      <div className="mb-8">
        <p className="text-gray-600 mb-6">
          Please enter the address where you need the service to be performed. We&apos;ll verify 
          that this location is within our service area.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Address *
            </label>
            <textarea
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Enter the full address where service is needed..."
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                addressError
                  ? 'border-red-300 focus:ring-red-500'
                  : isValidAddress
                  ? 'border-green-300 focus:ring-green-500'
                  : 'border-gray-300'
              }`}
              rows={3}
            />
            
            {addressError && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="mr-1">⚠️</span>
                {addressError}
              </p>
            )}
            
            {isValidAddress && !addressError && (
              <p className="mt-2 text-sm text-green-600 flex items-center">
                <span className="mr-1">✅</span>
                Address validated successfully
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => validateAddress(address)}
            disabled={!address.trim() || isValidating}
            className={`w-full sm:w-auto px-4 py-2 rounded-md transition-colors ${
              !address.trim() || isValidating
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isValidating ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Validating Address...
              </span>
            ) : (
              'Validate Address'
            )}
          </button>
        </div>

        {/* Address Guidelines */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Address Guidelines:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Include street number, street name, city, and postal code</li>
            <li>• Apartment or unit numbers help our providers locate you easily</li>
            <li>• We currently serve residential and commercial properties</li>
            <li>• Service availability may vary by location</li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!address.trim()}
          className={`px-6 py-2 rounded-md ${
            address.trim()
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isValidAddress ? 'Next: Details' : 'Validate & Continue'}
        </button>
      </div>
    </div>
  );
}