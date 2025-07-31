import { NextResponse } from 'next/server';

// For now, return mock data until we have a proper database setup
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

export async function GET() {
  try {
    // Filter only active services
    const activeServices = mockServices.filter(service => service.isActive);
    
    return NextResponse.json(activeServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}