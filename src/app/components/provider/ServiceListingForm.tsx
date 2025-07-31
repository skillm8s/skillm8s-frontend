'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ServiceListingFormProps {
  initialData?: {
    title?: string;
    description?: string;
    category?: string;
    subcategory?: string;
    pricingModel?: 'hourly' | 'fixed' | 'project';
    hourlyRate?: number;
    fixedPrice?: number;
    projectMinPrice?: number;
    projectMaxPrice?: number;
    duration?: string;
    location?: string;
    isPublished?: boolean;
  };
  mode?: 'create' | 'edit';
}

interface FormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  pricingModel: 'hourly' | 'fixed' | 'project';
  hourlyRate: string;
  fixedPrice: string;
  projectMinPrice: string;
  projectMaxPrice: string;
  duration: string;
  location: string;
  isPublished: boolean;
}

const categories = [
  'Outdoor & Yard Services',
  'Interior Services', 
  'Exterior Maintenance',
  'Plumbing & Heating',
  'Electrical Services',
  'Cleaning Services',
  'Moving & Delivery',
  'Assembly & Installation'
];

export default function ServiceListingForm({ initialData, mode = 'create' }: ServiceListingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    subcategory: initialData?.subcategory || '',
    pricingModel: initialData?.pricingModel || 'hourly',
    hourlyRate: initialData?.hourlyRate?.toString() || '',
    fixedPrice: initialData?.fixedPrice?.toString() || '',
    projectMinPrice: initialData?.projectMinPrice?.toString() || '',
    projectMaxPrice: initialData?.projectMaxPrice?.toString() || '',
    duration: initialData?.duration || '',
    location: initialData?.location || '',
    isPublished: initialData?.isPublished || false,
  });

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== files.length) {
      alert('Please select only image files');
      return;
    }
    
    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';

    if (formData.pricingModel === 'hourly' && !formData.hourlyRate) {
      newErrors.hourlyRate = 'Hourly rate is required';
    }
    if (formData.pricingModel === 'fixed' && !formData.fixedPrice) {
      newErrors.fixedPrice = 'Fixed price is required';
    }
    if (formData.pricingModel === 'project' && (!formData.projectMinPrice || !formData.projectMaxPrice)) {
      newErrors.projectPrice = 'Project price range is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const submitData = {
        ...formData,
        hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
        fixedPrice: formData.fixedPrice ? parseFloat(formData.fixedPrice) : null,
        projectMinPrice: formData.projectMinPrice ? parseFloat(formData.projectMinPrice) : null,
        projectMaxPrice: formData.projectMaxPrice ? parseFloat(formData.projectMaxPrice) : null,
      };

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save service listing');
      }

      const result = await response.json();
      console.log('Service listing saved:', result);
      
      router.push('/provider/dashboard');
    } catch (error) {
      console.error('Error saving service listing:', error);
      alert(`Error saving service listing: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, isPublished: false }));
    // Trigger form submission
    document.getElementById('service-form')?.dispatchEvent(new Event('submit', { bubbles: true }));
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, isPublished: true }));
    // Trigger form submission
    document.getElementById('service-form')?.dispatchEvent(new Event('submit', { bubbles: true }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === 'create' ? 'Create New Service Listing' : 'Edit Service Listing'}
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below to create your service listing
        </p>
      </div>

      <form id="service-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Professional Lawn Mowing Service"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <input
                type="text"
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Residential Lawn Care"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Service Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Toronto, ON or Within 25km of downtown"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Service Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your service in detail. Include what's included, your experience, equipment used, etc."
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            
            {/* Rich Text Editor Buttons */}
            <div className="mt-2 flex space-x-2">
              <button
                type="button"
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => {
                  const textarea = document.getElementById('description') as HTMLTextAreaElement;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const text = textarea.value;
                  const selectedText = text.substring(start, end);
                  const newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
                  setFormData(prev => ({ ...prev, description: newText }));
                }}
              >
                Bold
              </button>
              <button
                type="button"
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => {
                  const textarea = document.getElementById('description') as HTMLTextAreaElement;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const text = textarea.value;
                  const selectedText = text.substring(start, end);
                  const newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
                  setFormData(prev => ({ ...prev, description: newText }));
                }}
              >
                Italic
              </button>
              <button
                type="button"
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => {
                  setFormData(prev => ({ ...prev, description: prev.description + '\n• ' }));
                }}
              >
                Bullet Point
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Pricing</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pricing Model *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'hourly', label: 'Hourly Rate', desc: 'Charge by the hour' },
                { value: 'fixed', label: 'Fixed Price', desc: 'One-time flat fee' },
                { value: 'project', label: 'Project Based', desc: 'Price range for projects' }
              ].map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.pricingModel === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, pricingModel: option.value as 'hourly' | 'fixed' | 'project' }))}
                >
                  <input
                    type="radio"
                    name="pricingModel"
                    value={option.value}
                    checked={formData.pricingModel === option.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.pricingModel === 'hourly' && (
              <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate ($) *
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="35.00"
                />
                {errors.hourlyRate && <p className="mt-1 text-sm text-red-600">{errors.hourlyRate}</p>}
              </div>
            )}

            {formData.pricingModel === 'fixed' && (
              <div>
                <label htmlFor="fixedPrice" className="block text-sm font-medium text-gray-700 mb-2">
                  Fixed Price ($) *
                </label>
                <input
                  type="number"
                  id="fixedPrice"
                  name="fixedPrice"
                  value={formData.fixedPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fixedPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="150.00"
                />
                {errors.fixedPrice && <p className="mt-1 text-sm text-red-600">{errors.fixedPrice}</p>}
              </div>
            )}

            {formData.pricingModel === 'project' && (
              <>
                <div>
                  <label htmlFor="projectMinPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Price ($) *
                  </label>
                  <input
                    type="number"
                    id="projectMinPrice"
                    name="projectMinPrice"
                    value={formData.projectMinPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.projectPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="500.00"
                  />
                </div>
                <div>
                  <label htmlFor="projectMaxPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Price ($) *
                  </label>
                  <input
                    type="number"
                    id="projectMaxPrice"
                    name="projectMaxPrice"
                    value={formData.projectMaxPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.projectPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="2000.00"
                  />
                  {errors.projectPrice && <p className="mt-1 text-sm text-red-600">{errors.projectPrice}</p>}
                </div>
              </>
            )}

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 2-3 hours, 1 day, 1 week"
              />
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Images</h2>
          
          <div className="mb-6">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-600">
              Upload photos of your work, equipment, or examples of completed projects
            </p>
          </div>

          {imagePreview.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Image Preview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreview.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={128}
                      height={128}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save as Draft'}
          </button>
          <button
            type="button"
            onClick={handlePublish}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Publishing...' : 'Publish Service'}
          </button>
        </div>
      </form>
    </div>
  );
}