'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CalendarViewProps {
  currentView: 'day' | 'week' | 'month';
  setCurrentView: (view: 'day' | 'week' | 'month') => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
  isBooked: boolean;
  isBlocked: boolean;
}

export default function CalendarView({ 
  currentView, 
  setCurrentView, 
  currentDate, 
  setCurrentDate 
}: CalendarViewProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Generate time slots for a day (9 AM to 6 PM in 30-minute intervals)
  useEffect(() => {
    const slots: TimeSlot[] = [];
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          isAvailable: Math.random() > 0.3, // Mock availability
          isBooked: Math.random() > 0.8, // Mock bookings
          isBlocked: Math.random() > 0.9, // Mock blocked slots
        });
      }
    }
    setTimeSlots(slots);
  }, [currentDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
  };

  const getDateTitle = () => {
    switch (currentView) {
      case 'day':
        return formatDate(currentDate);
      case 'week':
        return formatWeekRange(currentDate);
      case 'month':
        return formatMonthYear(currentDate);
      default:
        return '';
    }
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const renderTimeSlot = (slot: TimeSlot, onClick?: () => void) => {
    let className = "p-2 border border-gray-200 rounded text-sm cursor-pointer transition-colors ";
    
    if (slot.isBlocked) {
      className += "bg-red-100 text-red-800 border-red-200";
    } else if (slot.isBooked) {
      className += "bg-blue-100 text-blue-800 border-blue-200";
    } else if (slot.isAvailable) {
      className += "bg-green-100 text-green-800 border-green-200 hover:bg-green-200";
    } else {
      className += "bg-gray-100 text-gray-500 border-gray-200";
    }

    return (
      <div key={slot.time} className={className} onClick={onClick}>
        <div className="font-medium">{slot.time}</div>
        <div className="text-xs">
          {slot.isBlocked ? 'Blocked' : slot.isBooked ? 'Booked' : slot.isAvailable ? 'Available' : 'Unavailable'}
        </div>
      </div>
    );
  };

  const toggleSlotAvailability = (slotTime: string) => {
    setTimeSlots(slots => 
      slots.map(slot => 
        slot.time === slotTime 
          ? { ...slot, isAvailable: !slot.isAvailable, isBlocked: false }
          : slot
      )
    );
  };

  const blockSlot = (slotTime: string) => {
    setTimeSlots(slots => 
      slots.map(slot => 
        slot.time === slotTime 
          ? { ...slot, isBlocked: !slot.isBlocked, isAvailable: false }
          : slot
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Calendar Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{getDateTitle()}</h2>
          
          <div className="flex items-center space-x-4">
            {/* Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Today
              </button>
              
              <button
                onClick={() => navigateDate('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {(['day', 'week', 'month'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-md capitalize transition-colors ${
                currentView === view
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Content */}
      <div className="p-6">
        {currentView === 'day' && (
          <div className="space-y-2">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Right-click to block/unblock time slots</span>
                <div className="flex space-x-4">
                  <span className="flex items-center"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded mr-1"></div>Available</span>
                  <span className="flex items-center"><div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-1"></div>Booked</span>
                  <span className="flex items-center"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded mr-1"></div>Blocked</span>
                  <span className="flex items-center"><div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded mr-1"></div>Unavailable</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => 
                renderTimeSlot(slot, () => toggleSlotAvailability(slot.time))
              )}
            </div>
          </div>
        )}

        {currentView === 'week' && (
          <div className="space-y-4">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Click to toggle availability, right-click to block</span>
                <div className="flex space-x-4">
                  <span className="flex items-center"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded mr-1"></div>Available</span>
                  <span className="flex items-center"><div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded mr-1"></div>Booked</span>
                  <span className="flex items-center"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded mr-1"></div>Blocked</span>
                  <span className="flex items-center"><div className="w-3 h-3 bg-gray-100 border border-gray-200 rounded mr-1"></div>Unavailable</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {getWeekDays().map((day, dayIndex) => (
                <div key={dayIndex} className="space-y-2">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {day.getDate()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {timeSlots.slice(0, 6).map((slot) => (
                      <div
                        key={`${dayIndex}-${slot.time}`}
                        className={`p-1 text-xs rounded cursor-pointer ${
                          slot.isBlocked ? 'bg-red-100 text-red-800' :
                          slot.isBooked ? 'bg-blue-100 text-blue-800' :
                          slot.isAvailable ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-500'
                        }`}
                        onClick={() => toggleSlotAvailability(slot.time)}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          blockSlot(slot.time);
                        }}
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'month' && (
          <div className="space-y-4">
            <div className="text-center text-gray-600 py-8">
              <p>Month view shows availability summary</p>
              <p className="text-sm mt-2">Switch to day or week view for detailed time slot management</p>
            </div>
            {/* Month calendar grid would go here */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="aspect-square border border-gray-200 rounded p-1 text-sm">
                  <div className="text-gray-900">{((i % 31) + 1)}</div>
                  <div className="text-xs text-green-600">Available</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}