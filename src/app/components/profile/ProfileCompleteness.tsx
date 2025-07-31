'use client';

import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  profilePic?: string;
  userType: string;
  skills?: string[];
  isComplete: boolean;
}

interface ProfileCompletenessProps {
  profile: Profile;
}

export default function ProfileCompleteness({ profile }: ProfileCompletenessProps) {
  const calculateCompleteness = () => {
    const requiredFields = [
      'firstName',
      'lastName', 
      'email',
      'phone',
      'address',
      'city',
      'state',
      'country'
    ];
    
    const optionalFields = ['bio', 'profilePic'];
    const providerFields = profile.userType === 'provider' ? ['skills'] : [];
    
    const allFields = [...requiredFields, ...optionalFields, ...providerFields];
    
    let completedFields = 0;
    const missingFields: string[] = [];
    
    requiredFields.forEach(field => {
      const value = profile[field as keyof Profile];
      if (value && value !== '') {
        completedFields++;
      } else {
        missingFields.push(field);
      }
    });
    
    optionalFields.forEach(field => {
      const value = profile[field as keyof Profile];
      if (value && value !== '') {
        completedFields++;
      }
    });
    
    if (profile.userType === 'provider') {
      if (profile.skills && profile.skills.length > 0) {
        completedFields++;
      } else {
        missingFields.push('skills');
      }
    }
    
    const percentage = Math.round((completedFields / allFields.length) * 100);
    
    return { percentage, missingFields, completedFields, totalFields: allFields.length };
  };

  const { percentage, missingFields } = calculateCompleteness();

  const formatFieldName = (field: string) => {
    const fieldNames: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      bio: 'Bio',
      address: 'Address',
      city: 'City',
      state: 'State/Province',
      country: 'Country',
      postalCode: 'Postal Code',
      profilePic: 'Profile Picture',
      skills: 'Skills & Services'
    };
    return fieldNames[field] || field;
  };

  const getCompletenessColor = () => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBarColor = () => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completeness</h3>
      
      {/* Progress Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={getCompletenessColor()}
              strokeDasharray={`${percentage * 2.51} 251`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xl font-bold ${getCompletenessColor()}`}>
              {percentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressBarColor()}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Status Message */}
      {percentage === 100 ? (
        <div className="flex items-center space-x-2 text-green-600 mb-4">
          <CheckCircleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Profile Complete!</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2 text-yellow-600 mb-4">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">
            {missingFields.length} field{missingFields.length !== 1 ? 's' : ''} missing
          </span>
        </div>
      )}

      {/* Missing Fields */}
      {missingFields.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Information:</h4>
          <ul className="space-y-1">
            {missingFields.map((field) => (
              <li key={field} className="text-sm text-gray-600 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                <span>{formatFieldName(field)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Completion Benefits */}
      {percentage < 100 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-1">Complete your profile to:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Increase booking chances</li>
            <li>• Build trust with customers</li>
            <li>• Access premium features</li>
          </ul>
        </div>
      )}
    </div>
  );
}