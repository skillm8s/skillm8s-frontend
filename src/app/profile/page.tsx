'use client';

import { useState, useEffect } from 'react';
import { UserCircleIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import ProfileEditForm from '../components/profile/ProfileEditForm';
import OrderHistory from '../components/profile/OrderHistory';
import ProfileCompleteness from '../components/profile/ProfileCompleteness';

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

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for now - in real app this would come from API/auth
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfile({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Experienced handyman with 10 years of experience in home repairs and maintenance.',
        address: '123 Main St',
        city: 'Toronto',
        state: 'Ontario',
        country: 'Canada',
        postalCode: 'M5V 3A8',
        userType: 'provider',
        skills: ['Plumbing', 'Electrical', 'Carpentry'],
        isComplete: false
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile not found</h1>
            <p className="text-gray-600 mt-2">Please sign in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {profile.profilePic ? (
                  <Image
                    src={profile.profilePic}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="w-20 h-20 text-gray-400" />
                )}
                <button className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors">
                  <PhotoIcon className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-600 capitalize">{profile.userType}</p>
                <p className="text-gray-500">{profile.email}</p>
                {profile.bio && (
                  <p className="text-gray-700 mt-2 max-w-md">{profile.bio}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {isEditing ? (
              <ProfileEditForm 
                profile={profile} 
                onSave={(updatedProfile) => {
                  setProfile(updatedProfile);
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <>
                {/* Profile Details */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone</label>
                      <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-gray-900">{profile.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-gray-900">
                        {profile.address ? (
                          `${profile.address}, ${profile.city}, ${profile.state}, ${profile.country} ${profile.postalCode}`
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    </div>
                    {profile.userType === 'provider' && profile.skills && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500">Skills & Services</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {profile.skills.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order History */}
                <OrderHistory userId={profile.id} />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileCompleteness profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}