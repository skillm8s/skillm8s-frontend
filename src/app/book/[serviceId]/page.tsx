'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DateTimeSelector from './components/DateTimeSelector';
import LocationInput from './components/LocationInput';
import BookingDetailsForm from './components/BookingDetailsForm';
import BookingConfirmation from './components/BookingConfirmation';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  duration: number;
}

interface BookingData {
  serviceId: string;
  providerId: string;
  date: string;
  time: string;
  address: string;
  addressLat?: number;
  addressLng?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  requirements: string;
}

export default function BookServicePage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.serviceId as string;
  
  const [service, setService] = useState<Service | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    serviceId: serviceId,
  });

  const fetchService = useCallback(async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`);
      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else {
        // Service not found, redirect to service selection
        router.push('/book');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      router.push('/book');
    } finally {
      setLoading(false);
    }
  }, [serviceId, router]);

  useEffect(() => {
    fetchService();
  }, [fetchService]);

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Service not found</p>
          <button
            onClick={() => router.push('/book')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Date & Time', component: DateTimeSelector },
    { number: 2, title: 'Location', component: LocationInput },
    { number: 3, title: 'Details', component: BookingDetailsForm },
    { number: 4, title: 'Confirmation', component: BookingConfirmation },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push('/book')}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to Services
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Duration: {service.duration} minutes</span>
            <span>Starting from: ${service.basePrice}</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step.number <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`ml-2 font-medium ${
                    step.number <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CurrentStepComponent
            service={service}
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            onNext={nextStep}
            onPrev={prevStep}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === 4}
          />
        </div>
      </div>
    </div>
  );
}