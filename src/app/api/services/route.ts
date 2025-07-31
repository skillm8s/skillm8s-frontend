import { NextResponse } from 'next/server';

// Mock data storage (in a real app, this would use the database)
const mockServicesData = [
  {
    id: '1',
    title: 'Professional Lawn Mowing',
    description: 'High-quality lawn mowing service with professional equipment. Includes edging and cleanup.',
    category: 'Outdoor & Yard Services',
    subcategory: 'Lawn Care',
    pricingModel: 'hourly',
    hourlyRate: 35,
    fixedPrice: null,
    projectMinPrice: null,
    projectMaxPrice: null,
    duration: '1-2 hours',
    location: 'Toronto, ON',
    isPublished: true,
    providerId: 'mock-provider-1',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    images: []
  },
  {
    id: '2',
    title: 'House Painting Service',
    description: 'Complete interior and exterior painting services. Professional grade materials and equipment.',
    category: 'Interior Services',
    subcategory: 'Painting',
    pricingModel: 'project',
    hourlyRate: null,
    fixedPrice: null,
    projectMinPrice: 800,
    projectMaxPrice: 2500,
    duration: '2-5 days',
    location: 'Toronto, ON',
    isPublished: false,
    providerId: 'mock-provider-1',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
    images: []
  }
];

// Create a mutable copy for the API
// Note: In a real app, this would be replaced with database operations

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const providerId = searchParams.get('providerId');
    const published = searchParams.get('published');

    let services = [...mockServicesData];

    // Filter by provider if specified
    if (providerId) {
      services = services.filter(service => service.providerId === providerId);
    }

    // Filter by published status if specified
    if (published !== null) {
      const isPublished = published === 'true';
      services = services.filter(service => service.isPublished === isPublished);
    }

    return NextResponse.json({
      services,
      total: services.length
    });

  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      subcategory,
      pricingModel,
      hourlyRate,
      fixedPrice,
      projectMinPrice,
      projectMaxPrice,
      duration,
      location,
      isPublished
    } = body;

    // Validate required fields
    if (!title || !description || !category || !pricingModel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate pricing based on model
    if (pricingModel === 'hourly' && !hourlyRate) {
      return NextResponse.json(
        { error: 'Hourly rate is required for hourly pricing' },
        { status: 400 }
      );
    }
    if (pricingModel === 'fixed' && !fixedPrice) {
      return NextResponse.json(
        { error: 'Fixed price is required for fixed pricing' },
        { status: 400 }
      );
    }
    if (pricingModel === 'project' && (!projectMinPrice || !projectMaxPrice)) {
      return NextResponse.json(
        { error: 'Project price range is required for project pricing' },
        { status: 400 }
      );
    }

    // Create new service
    const newService = {
      id: Date.now().toString(), // Simple ID generation for mock
      title,
      description,
      category,
      subcategory: subcategory || null,
      pricingModel,
      hourlyRate: pricingModel === 'hourly' ? parseFloat(hourlyRate) : null,
      fixedPrice: pricingModel === 'fixed' ? parseFloat(fixedPrice) : null,
      projectMinPrice: pricingModel === 'project' ? parseFloat(projectMinPrice) : null,
      projectMaxPrice: pricingModel === 'project' ? parseFloat(projectMaxPrice) : null,
      duration: duration || null,
      location: location || null,
      isPublished: Boolean(isPublished),
      providerId: 'mock-provider-1', // Mock provider ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: []
    };

    // Add to mock storage (for this demo, we'll just return the new service)
    // In a real app, this would save to the database

    return NextResponse.json(
      { message: 'Service listing created successfully', service: newService },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating service listing:', error);
    return NextResponse.json(
      { error: 'Failed to create service listing' },
      { status: 500 }
    );
  }
}