'use client';

import { useState } from 'react';

interface BookingSettings {
  bufferTime: number;
  defaultDuration: number;
  maxAdvanceBooking: number;
  minAdvanceBooking: number;
  allowBackToBack: boolean;
}

export default function BookingConfiguration() {
  const [settings, setSettings] = useState<BookingSettings>({
    bufferTime: 15,
    defaultDuration: 60,
    maxAdvanceBooking: 30,
    minAdvanceBooking: 2,
    allowBackToBack: false,
  });

  const updateSetting = (field: keyof BookingSettings, value: number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const saveSettings = () => {
    // In a real app, this would make an API call to save the settings
    console.log('Saving booking settings:', settings);
    alert('Booking configuration saved successfully!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Configuration</h3>
      
      <div className="space-y-6">
        {/* Buffer Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buffer Time Between Bookings
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={settings.bufferTime}
              onChange={(e) => updateSetting('bufferTime', parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-900 min-w-[60px]">
              {settings.bufferTime} min
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Time gap between consecutive bookings for preparation/travel
          </p>
        </div>

        {/* Default Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Booking Duration
          </label>
          <select
            value={settings.defaultDuration}
            onChange={(e) => updateSetting('defaultDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
            <option value={180}>3 hours</option>
            <option value={240}>4 hours</option>
          </select>
        </div>

        {/* Advance Booking Limits */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Advance Booking (days)
            </label>
            <input
              type="number"
              min="1"
              max="365"
              value={settings.maxAdvanceBooking}
              onChange={(e) => updateSetting('maxAdvanceBooking', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Advance Booking (hours)
            </label>
            <input
              type="number"
              min="0"
              max="72"
              value={settings.minAdvanceBooking}
              onChange={(e) => updateSetting('minAdvanceBooking', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Allow Back-to-Back */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.allowBackToBack}
              onChange={(e) => updateSetting('allowBackToBack', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Allow back-to-back bookings
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            When enabled, ignores buffer time for consecutive bookings
          </p>
        </div>

        {/* Service Types */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Service Duration Templates</h4>
          <div className="space-y-2">
            {[
              { name: 'Quick Fix', duration: 30 },
              { name: 'Standard Service', duration: 60 },
              { name: 'Deep Clean', duration: 120 },
              { name: 'Major Repair', duration: 240 },
            ].map((template) => (
              <button
                key={template.name}
                onClick={() => updateSetting('defaultDuration', template.duration)}
                className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{template.name}</span>
                  <span className="text-sm text-gray-500">{template.duration} min</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={saveSettings}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
}