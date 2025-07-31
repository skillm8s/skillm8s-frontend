'use client';

import { useState } from 'react';

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface WeeklyAvailability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

interface AvailabilityCalendarProps {
  availability?: WeeklyAvailability;
  timeZone: string;
  onChange: (availability: WeeklyAvailability, timeZone: string) => void;
}

const defaultTimeSlot: TimeSlot = { start: '09:00', end: '17:00' };

const defaultDayAvailability: DayAvailability = {
  enabled: false,
  timeSlots: [defaultTimeSlot]
};

const defaultWeeklyAvailability: WeeklyAvailability = {
  monday: { ...defaultDayAvailability },
  tuesday: { ...defaultDayAvailability },
  wednesday: { ...defaultDayAvailability },
  thursday: { ...defaultDayAvailability },
  friday: { ...defaultDayAvailability },
  saturday: { ...defaultDayAvailability },
  sunday: { ...defaultDayAvailability }
};

export default function AvailabilityCalendar({ availability, timeZone, onChange }: AvailabilityCalendarProps) {
  const [weeklyAvailability, setWeeklyAvailability] = useState<WeeklyAvailability>(
    availability || defaultWeeklyAvailability
  );

  const timeZones = [
    'America/New_York',
    'America/Chicago', 
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'America/Anchorage',
    'Pacific/Honolulu'
  ];

  const timeZoneNames: { [key: string]: string } = {
    'America/New_York': 'Eastern Time (ET)',
    'America/Chicago': 'Central Time (CT)', 
    'America/Denver': 'Mountain Time (MT)',
    'America/Los_Angeles': 'Pacific Time (PT)',
    'America/Phoenix': 'Arizona Time (MST)',
    'America/Anchorage': 'Alaska Time (AKST)',
    'Pacific/Honolulu': 'Hawaii Time (HST)'
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const updateAvailability = (newAvailability: WeeklyAvailability) => {
    setWeeklyAvailability(newAvailability);
    onChange(newAvailability, timeZone);
  };

  const toggleDay = (day: keyof WeeklyAvailability) => {
    const newAvailability = {
      ...weeklyAvailability,
      [day]: {
        ...weeklyAvailability[day],
        enabled: !weeklyAvailability[day].enabled,
        timeSlots: weeklyAvailability[day].enabled 
          ? [] 
          : [defaultTimeSlot]
      }
    };
    updateAvailability(newAvailability);
  };

  const updateTimeSlot = (day: keyof WeeklyAvailability, slotIndex: number, field: 'start' | 'end', value: string) => {
    const dayAvailability = { ...weeklyAvailability[day] };
    dayAvailability.timeSlots = [...dayAvailability.timeSlots];
    dayAvailability.timeSlots[slotIndex] = {
      ...dayAvailability.timeSlots[slotIndex],
      [field]: value
    };

    const newAvailability = {
      ...weeklyAvailability,
      [day]: dayAvailability
    };
    updateAvailability(newAvailability);
  };

  const addTimeSlot = (day: keyof WeeklyAvailability) => {
    const dayAvailability = { ...weeklyAvailability[day] };
    dayAvailability.timeSlots = [...dayAvailability.timeSlots, defaultTimeSlot];

    const newAvailability = {
      ...weeklyAvailability,
      [day]: dayAvailability
    };
    updateAvailability(newAvailability);
  };

  const removeTimeSlot = (day: keyof WeeklyAvailability, slotIndex: number) => {
    const dayAvailability = { ...weeklyAvailability[day] };
    dayAvailability.timeSlots = dayAvailability.timeSlots.filter((_, index) => index !== slotIndex);

    // If no time slots left, disable the day
    if (dayAvailability.timeSlots.length === 0) {
      dayAvailability.enabled = false;
    }

    const newAvailability = {
      ...weeklyAvailability,
      [day]: dayAvailability
    };
    updateAvailability(newAvailability);
  };

  const setBusinessHours = () => {
    const businessHoursAvailability: WeeklyAvailability = {
      monday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
      tuesday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
      wednesday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
      thursday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
      friday: { enabled: true, timeSlots: [{ start: '09:00', end: '17:00' }] },
      saturday: { enabled: false, timeSlots: [] },
      sunday: { enabled: false, timeSlots: [] }
    };
    updateAvailability(businessHoursAvailability);
  };

  const clearAllAvailability = () => {
    updateAvailability(defaultWeeklyAvailability);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Availability Calendar
        </h3>
        <p className="text-gray-600 mb-6">
          Set your weekly availability schedule. This helps customers know when you&apos;re available for services.
        </p>
      </div>

      {/* Time Zone Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time Zone
        </label>
        <select
          value={timeZone}
          onChange={(e) => onChange(weeklyAvailability, e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeZones.map(tz => (
            <option key={tz} value={tz}>
              {timeZoneNames[tz]}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={setBusinessHours}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Set Business Hours (9 AM - 5 PM, Mon-Fri)
        </button>
        <button
          type="button"
          onClick={clearAllAvailability}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear All
        </button>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {daysOfWeek.map(({ key, label }) => {
          const dayKey = key as keyof WeeklyAvailability;
          const dayData = weeklyAvailability[dayKey];
          
          return (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dayData.enabled}
                    onChange={() => toggleDay(dayKey)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-900">{label}</span>
                </label>
                
                {dayData.enabled && (
                  <button
                    type="button"
                    onClick={() => addTimeSlot(dayKey)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                  >
                    Add Time Slot
                  </button>
                )}
              </div>

              {dayData.enabled && (
                <div className="space-y-3">
                  {dayData.timeSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateTimeSlot(dayKey, index, 'start', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateTimeSlot(dayKey, index, 'end', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      {dayData.timeSlots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(dayKey, index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!dayData.enabled && (
                <p className="text-gray-500 text-sm">Not available</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Availability Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Availability Summary</h4>
        <div className="text-sm text-blue-800">
          {daysOfWeek.filter(({ key }) => weeklyAvailability[key as keyof WeeklyAvailability].enabled).length > 0 ? (
            <>
              <p>You&apos;re available on:</p>
              <ul className="mt-2 space-y-1">
                {daysOfWeek.map(({ key, label }) => {
                  const dayKey = key as keyof WeeklyAvailability;
                  const dayData = weeklyAvailability[dayKey];
                  
                  if (!dayData.enabled) return null;
                  
                  return (
                    <li key={key}>
                      <strong>{label}:</strong> {dayData.timeSlots.map((slot, index) => (
                        <span key={index}>
                          {slot.start} - {slot.end}
                          {index < dayData.timeSlots.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2">
                <strong>Time Zone:</strong> {timeZoneNames[timeZone]}
              </p>
            </>
          ) : (
            <p>No availability set. Please select your available days and times.</p>
          )}
        </div>
      </div>
    </div>
  );
}