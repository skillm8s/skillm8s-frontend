'use client';

import { useState, useRef } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string;
  userId: string;
  onPhotoUpdate: (photoUrl: string) => void;
}

export default function ProfilePhotoUpload({ 
  currentPhotoUrl, 
  userId, 
  onPhotoUpdate 
}: ProfilePhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      onPhotoUpdate(data.url);
    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Photo Display */}
      <div className="relative">
        {currentPhotoUrl ? (
          <Image
            src={currentPhotoUrl}
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <UserCircleIcon className="w-32 h-32 text-gray-400" />
        )}
        
        {/* Upload Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ${
            uploading 
              ? 'bg-black bg-opacity-50' 
              : 'bg-black bg-opacity-0 hover:bg-opacity-30'
          }`}
          onClick={handleClick}
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          ) : (
            <PhotoIcon className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`w-full max-w-md p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <div className="text-center">
          <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Click to upload
            </span>
            {' '}or drag and drop
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG, WebP up to 5MB
          </p>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Upload Button */}
      <button
        onClick={handleClick}
        disabled={uploading}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        <PhotoIcon className="w-4 h-4" />
        <span>{uploading ? 'Uploading...' : 'Change Photo'}</span>
      </button>
    </div>
  );
}