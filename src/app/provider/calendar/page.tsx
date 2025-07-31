'use client';

import { useState } from 'react';
import CalendarView from '@/app/components/calendar/CalendarView';
import AvailabilitySettings from '@/app/components/calendar/AvailabilitySettings';
import BookingConfiguration from '@/app/components/calendar/BookingConfiguration';

export default function ProviderCalendar() {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week');
  const [showSettings, setShowSettings] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Provider Calendar</h1>
              <p className="text-gray-600 mt-2">Manage your availability and bookings</p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showSettings ? 'Hide Settings' : 'Availability Settings'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar View */}
          <div className="lg:col-span-3">
            <CalendarView 
              currentView={currentView}
              setCurrentView={setCurrentView}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <BookingConfiguration />
            
            {showSettings && (
              <AvailabilitySettings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}