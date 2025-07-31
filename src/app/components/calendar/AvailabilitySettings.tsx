'use client';

import { useState } from 'react';

interface AvailabilityPattern {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isEnabled: boolean;
}

export default function AvailabilitySettings() {
  const [availabilityPatterns, setAvailabilityPatterns] = useState<AvailabilityPattern[]>([
    { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isEnabled: true }, // Monday
    { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isEnabled: true }, // Tuesday
    { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isEnabled: true }, // Wednesday
    { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isEnabled: true }, // Thursday
    { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isEnabled: true }, // Friday
    { dayOfWeek: 6, startTime: '10:00', endTime: '14:00', isEnabled: false }, // Saturday
    { dayOfWeek: 0, startTime: '10:00', endTime: '14:00', isEnabled: false }, // Sunday
  ]);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const updatePattern = (dayOfWeek: number, field: keyof AvailabilityPattern, value: string | boolean) => {
    setAvailabilityPatterns(patterns =>
      patterns.map(pattern =>
        pattern.dayOfWeek === dayOfWeek
          ? { ...pattern, [field]: value }
          : pattern
      )
    );
  };

  const saveAvailability = () => {
    // In a real app, this would make an API call to save the patterns
    console.log('Saving availability patterns:', availabilityPatterns);
    alert('Availability patterns saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recurring Availability</h3>
      
      <div className="space-y-4 mb-6">
        {availabilityPatterns.map((pattern) => (
          <div key={pattern.dayOfWeek} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={pattern.isEnabled}
                  onChange={(e) => updatePattern(pattern.dayOfWeek, 'isEnabled', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 font-medium text-gray-900">
                  {daysOfWeek[pattern.dayOfWeek]}
                </span>
              </label>
            </div>
            
            {pattern.isEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={pattern.startTime}
                    onChange={(e) => updatePattern(pattern.dayOfWeek, 'startTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={pattern.endTime}
                    onChange={(e) => updatePattern(pattern.dayOfWeek, 'endTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-md font-medium text-gray-900 mb-3">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setAvailabilityPatterns(patterns =>
                  patterns.map(pattern => ({ ...pattern, isEnabled: true }))
                );
              }}
              className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
            >
              Enable All Days
            </button>
            <button
              onClick={() => {
                setAvailabilityPatterns(patterns =>
                  patterns.map(pattern => 
                    pattern.dayOfWeek >= 1 && pattern.dayOfWeek <= 5
                      ? { ...pattern, isEnabled: true }
                      : { ...pattern, isEnabled: false }
                  )
                );
              }}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
            >
              Weekdays Only
            </button>
            <button
              onClick={() => {
                setAvailabilityPatterns(patterns =>
                  patterns.map(pattern => ({ ...pattern, isEnabled: false }))
                );
              }}
              className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
            >
              Disable All
            </button>
          </div>
        </div>

        <button
          onClick={saveAvailability}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
}