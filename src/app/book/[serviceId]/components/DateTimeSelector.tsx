'use client';

import { useState, useEffect, useCallback } from 'react';

interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  reviewCount: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
  providerId: string;
  provider: Provider;
}

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

interface DateTimeSelectorProps {
  service: Service;
  bookingData: Partial<BookingData>;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function DateTimeSelector({
  service,
  bookingData,
  updateBookingData,
  onNext,
  onPrev,
  isFirstStep,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(bookingData.date || '');
  const [selectedTime, setSelectedTime] = useState(bookingData.time || '');
  const [selectedProviderId, setSelectedProviderId] = useState(bookingData.providerId || '');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAvailableSlots = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/availability?serviceId=${service.id}&date=${date}`);
      if (response.ok) {
        const slots = await response.json();
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  }, [service.id]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, fetchAvailableSlots]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setSelectedProviderId('');
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTime(slot.time);
    setSelectedProviderId(slot.providerId);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime && selectedProviderId) {
      updateBookingData({
        date: selectedDate,
        time: selectedTime,
        providerId: selectedProviderId,
      });
      onNext();
    }
  };

  // Generate next 30 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
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

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Select Date and Time
      </h2>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose a Date</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {getAvailableDates().map((date) => (
            <button
              key={date}
              onClick={() => handleDateChange(date)}
              className={`p-3 text-sm rounded-md border transition-colors ${
                selectedDate === date
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className="font-medium">
                {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="text-xs">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Available Times for {formatDate(selectedDate)}
          </h3>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading available times...</p>
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSlotSelect(slot)}
                  disabled={!slot.available}
                  className={`p-4 text-sm rounded-md border transition-colors ${
                    selectedTime === slot.time && selectedProviderId === slot.providerId
                      ? 'bg-blue-600 text-white border-blue-600'
                      : slot.available
                      ? 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  <div className="font-medium">{formatTime(slot.time)}</div>
                  <div className="text-xs mt-1">
                    {slot.provider.firstName} {slot.provider.lastName}
                  </div>
                  <div className="text-xs">
                    ⭐ {slot.provider.rating?.toFixed(1) || '5.0'} ({slot.provider.reviewCount || 0})
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No available time slots for this date. Please select another date.
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          disabled={isFirstStep}
          className={`px-6 py-2 rounded-md ${
            isFirstStep
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime || !selectedProviderId}
          className={`px-6 py-2 rounded-md ${
            selectedDate && selectedTime && selectedProviderId
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next: Location
        </button>
      </div>
    </div>
  );
}