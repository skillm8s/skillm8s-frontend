'use client';

interface BusinessInformationProfile {
  businessName?: string;
  businessType?: string;
  phone?: string;
  taxId?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  licenseNumber?: string;
  licensingBody?: string;
  licenseExpiry?: string;
  insuranceProvider?: string;
  insurancePolicy?: string;
  insuranceExpiry?: string;
  bondedAmount?: number;
  bio?: string;
}

interface BusinessInformationFormProps {
  profile: BusinessInformationProfile;
  onChange: (updates: Partial<BusinessInformationProfile>) => void;
}

export default function BusinessInformationForm({ profile, onChange }: BusinessInformationFormProps) {
  const businessTypes = [
    'Individual/Sole Proprietor',
    'Limited Liability Company (LLC)',
    'Corporation',
    'Partnership',
    'S-Corporation'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Business Information
        </h3>
        <p className="text-gray-600 mb-6">
          Provide your business details, licensing, and insurance information.
        </p>
      </div>

      {/* Basic Business Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={profile.businessName || ''}
            onChange={(e) => onChange({ businessName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type
          </label>
          <select
            value={profile.businessType || ''}
            onChange={(e) => onChange({ businessType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={profile.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax ID / EIN (Optional)
          </label>
          <input
            type="text"
            value={profile.taxId || ''}
            onChange={(e) => onChange({ taxId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="XX-XXXXXXX"
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Business Address</h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Street Address
          </label>
          <input
            type="text"
            value={profile.address || ''}
            onChange={(e) => onChange({ address: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={profile.country || ''}
              onChange={(e) => onChange({ country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="USA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={profile.state || ''}
              onChange={(e) => onChange({ state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="California"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={profile.city || ''}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Los Angeles"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              value={profile.zipCode || ''}
              onChange={(e) => onChange({ zipCode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="90210"
            />
          </div>
        </div>
      </div>

      {/* Licensing Information */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Licensing Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Number
            </label>
            <input
              type="text"
              value={profile.licenseNumber || ''}
              onChange={(e) => onChange({ licenseNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="License number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Licensing Body
            </label>
            <input
              type="text"
              value={profile.licensingBody || ''}
              onChange={(e) => onChange({ licensingBody: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., State Board of Contractors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            License Expiry Date
          </label>
          <input
            type="date"
            value={profile.licenseExpiry || ''}
            onChange={(e) => onChange({ licenseExpiry: e.target.value })}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Insurance Information */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900">Insurance Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Provider
            </label>
            <input
              type="text"
              value={profile.insuranceProvider || ''}
              onChange={(e) => onChange({ insuranceProvider: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., State Farm, Allstate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </label>
            <input
              type="text"
              value={profile.insurancePolicy || ''}
              onChange={(e) => onChange({ insurancePolicy: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Policy number"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Expiry Date
            </label>
            <input
              type="date"
              value={profile.insuranceExpiry || ''}
              onChange={(e) => onChange({ insuranceExpiry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bonded Amount (USD)
            </label>
            <input
              type="number"
              min="0"
              step="1000"
              value={profile.bondedAmount || ''}
              onChange={(e) => onChange({ bondedAmount: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 10000"
            />
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <textarea
          value={profile.bio || ''}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tell potential clients about your experience, work philosophy, and what sets you apart..."
        />
        <p className="text-sm text-gray-500 mt-1">
          This will be displayed on your public profile.
        </p>
      </div>
    </div>
  );
}