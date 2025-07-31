import { NextResponse } from 'next/server';

// Mock data - same as in services/route.ts
const mockServices = [
  {
    id: '1',
    name: 'Home Cleaning',
    category: 'Home Cleaning & Appearance',
    description: 'Professional home cleaning service including dusting, vacuuming, mopping, and bathroom/kitchen cleaning.',
    basePrice: 80,
    duration: 120,
    isActive: true,
  },
  {
    id: '2', 
    name: 'Plumbing Repair',
    category: 'Core Home Systems',
    description: 'Professional plumbing services for leaks, clogs, and fixture installations.',
    basePrice: 120,
    duration: 90,
    isActive: true,
  },
  {
    id: '3',
    name: 'Electrical Repair',
    category: 'Core Home Systems', 
    description: 'Licensed electrical services for outlets, switches, and fixture installations.',
    basePrice: 150,
    duration: 60,
    isActive: true,
  },
  {
    id: '4',
    name: 'Lawn Mowing',
    category: 'Outdoor & Yard Services',
    description: 'Professional lawn care including mowing, edging, and basic yard cleanup.',
    basePrice: 60,
    duration: 90,
    isActive: true,
  },
  {
    id: '5',
    name: 'Interior Painting',
    category: 'Interior Maintenance',
    description: 'Professional interior painting services for rooms and touch-ups.',
    basePrice: 200,
    duration: 240,
    isActive: true,
  },
];

export async function GET(
  request: Request,
  context: { params: Promise<{ serviceId: string }> }
) {
  try {
    const params = await context.params;
    const serviceId = params.serviceId;
    
    const service = mockServices.find(s => s.id === serviceId && s.isActive);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}