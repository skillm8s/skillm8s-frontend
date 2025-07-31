'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

interface BookingConfirmationProps {
  service: Service;
  bookingData: Partial<BookingData>;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function BookingConfirmation({
  service,
  bookingData,
  onPrev,
}: BookingConfirmationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [bookingId, setBookingId] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          serviceId: service.id,
          duration: service.duration,
          estimatedPrice: service.basePrice,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setBookingId(result.booking.id);
      } else {
        setSubmissionError(result.error || 'Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmissionError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // If booking is successfully created, show success screen
  if (bookingId) {
    return (
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your booking has been successfully created. You will receive a confirmation email shortly.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Booking Reference: #{bookingId.slice(-8).toUpperCase()}
          </h3>
          <div className="text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-green-700">Service:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Date:</span>
              <span>{bookingData.date ? formatDate(bookingData.date) : 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Time:</span>
              <span>{bookingData.time ? formatTime(bookingData.time) : 'Not selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Duration:</span>
              <span>{service.duration} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-700">Location:</span>
              <span className="text-right">{bookingData.address}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900">What&apos;s Next?</h4>
          <div className="text-left bg-blue-50 p-4 rounded-md">
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• You&apos;ll receive a confirmation email with booking details</li>
              <li>• Your assigned provider will contact you 24 hours before the appointment</li>
              <li>• If you need to reschedule or cancel, please contact us at least 24 hours in advance</li>
              <li>• Payment will be handled after the service is completed</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={() => router.push('/')}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push('/book')}
            className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Book Another Service
          </button>
        </div>
      </div>
    );
  }

  // Show confirmation form
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Confirm Your Booking
      </h2>

      <div className="space-y-6">
        {/* Booking Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Service Details</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Service:</span>
                  <div className="font-medium">{service.name}</div>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <div>{service.category}</div>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <div>{service.duration} minutes</div>
                </div>
                <div>
                  <span className="text-gray-600">Estimated Price:</span>
                  <div className="font-medium text-green-600">${service.basePrice}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-3">Appointment Details</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Date:</span>
                  <div className="font-medium">{bookingData.date ? formatDate(bookingData.date) : 'Not selected'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Time:</span>
                  <div className="font-medium">{bookingData.time ? formatTime(bookingData.time) : 'Not selected'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <div>{bookingData.address || 'Not specified'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <div className="font-medium">{bookingData.customerName || 'Not provided'}</div>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <div>{bookingData.customerEmail || 'Not provided'}</div>
            </div>
            {bookingData.customerPhone && (
              <div>
                <span className="text-gray-600">Phone:</span>
                <div>{bookingData.customerPhone}</div>
              </div>
            )}
          </div>
          
          {bookingData.requirements && (
            <div className="mt-4">
              <span className="text-gray-600">Special Requirements:</span>
              <div className="mt-1 text-gray-800">{bookingData.requirements}</div>
            </div>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="font-medium text-blue-900 mb-2">Terms & Conditions</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Cancellations must be made at least 24 hours in advance</li>
            <li>• Payment is processed after service completion</li>
            <li>• Additional charges may apply for extra work outside the original scope</li>
            <li>• Service providers are insured and background-checked</li>
          </ul>
        </div>

        {submissionError && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-800 text-sm">{submissionError}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className={`px-6 py-2 rounded-md ${
            isSubmitting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleSubmitBooking}
          disabled={isSubmitting}
          className={`px-8 py-2 rounded-md ${
            isSubmitting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Confirming Booking...
            </span>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </div>
    </div>
  );
}