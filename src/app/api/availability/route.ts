import { NextResponse } from 'next/server';

// Types
interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  rating: number;
  reviewCount: number;
  services: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
  providerId: string;
  provider: Provider;
}

// Mock providers data
const mockProviders = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    rating: 4.8,
    reviewCount: 42,
    services: ['Home Cleaning & Appearance', 'Interior Maintenance'],
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    rating: 4.9,
    reviewCount: 68,
    services: ['Core Home Systems'],
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Davis',
    rating: 4.7,
    reviewCount: 35,
    services: ['Outdoor & Yard Services'],
  },
  {
    id: '4',
    firstName: 'Lisa',
    lastName: 'Williams',
    rating: 4.9,
    reviewCount: 55,
    services: ['Home Cleaning & Appearance', 'Interior Maintenance'],
  },
];

// Mock service categories mapping
const serviceCategories: Record<string, string> = {
  '1': 'Home Cleaning & Appearance',
  '2': 'Core Home Systems',
  '3': 'Core Home Systems',
  '4': 'Outdoor & Yard Services',
  '5': 'Interior Maintenance',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');
    const date = searchParams.get('date');

    if (!serviceId || !date) {
      return NextResponse.json(
        { error: 'serviceId and date are required' },
        { status: 400 }
      );
    }

    // Get service category
    const serviceCategory = serviceCategories[serviceId];
    if (!serviceCategory) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Filter providers who offer this service category
    const availableProviders = mockProviders.filter(provider =>
      provider.services.includes(serviceCategory)
    );

    // Generate time slots for the date
    const timeSlots: TimeSlot[] = [];
    // const selectedDate = new Date(date); // for future date validation
    // const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 6 = Saturday - for future use

    // Generate slots from 9 AM to 5 PM
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 60) { // 1-hour slots
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Randomly assign providers to time slots (simulate availability)
        availableProviders.forEach(provider => {
          // Simulate some availability - not all providers available at all times
          const isAvailable = Math.random() > 0.3; // 70% chance of being available
          
          if (isAvailable) {
            timeSlots.push({
              time: timeString,
              available: true,
              providerId: provider.id,
              provider: provider,
            });
          }
        });
      }
    }

    // Sort by time
    timeSlots.sort((a, b) => a.time.localeCompare(b.time));

    return NextResponse.json(timeSlots);
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}