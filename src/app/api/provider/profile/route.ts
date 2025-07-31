import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      lastName,
      phone,
      country,
      state,
      city,
      address,
      zipCode,
      serviceCategories,
      skills,
      experience,
      certifications,
      education,
      businessName,
      businessType,
      taxId,
      licenseNumber,
      licensingBody,
      licenseExpiry,
      insuranceProvider,
      insurancePolicy,
      insuranceExpiry,
      bondedAmount,
      availability,
      timeZone,
      bio
    } = body;

    // Validate required fields
    if (!email || !firstName || !lastName || !country || !state || !city || !serviceCategories || serviceCategories.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: email, firstName, lastName, country, state, city, and at least one service category' },
        { status: 400 }
      );
    }

    // Check if provider already exists
    const existingProvider = await prisma.serviceProvider.findUnique({
      where: { email }
    });

    let provider;

    if (existingProvider) {
      // Update existing provider
      provider = await prisma.serviceProvider.update({
        where: { email },
        data: {
          firstName,
          lastName,
          phone,
          country,
          state,
          city,
          address,
          zipCode,
          serviceCategories,
          skills,
          experience,
          certifications,
          education,
          businessName,
          businessType,
          taxId,
          licenseNumber,
          licensingBody,
          licenseExpiry: licenseExpiry ? new Date(licenseExpiry) : null,
          insuranceProvider,
          insurancePolicy,
          insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
          bondedAmount,
          availability,
          timeZone,
          bio,
          updatedAt: new Date()
        }
      });
    } else {
      // Create new provider
      provider = await prisma.serviceProvider.create({
        data: {
          email,
          firstName,
          lastName,
          phone,
          country,
          state,
          city,
          address,
          zipCode,
          serviceCategories,
          skills,
          experience,
          certifications,
          education,
          businessName,
          businessType,
          taxId,
          licenseNumber,
          licensingBody,
          licenseExpiry: licenseExpiry ? new Date(licenseExpiry) : null,
          insuranceProvider,
          insurancePolicy,
          insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
          bondedAmount,
          availability,
          timeZone,
          bio
        }
      });
    }

    return NextResponse.json(
      { 
        message: existingProvider ? 'Profile updated successfully' : 'Profile created successfully', 
        provider: {
          id: provider.id,
          email: provider.email,
          firstName: provider.firstName,
          lastName: provider.lastName
        }
      },
      { status: existingProvider ? 200 : 201 }
    );

  } catch (error: unknown) {
    console.error('Provider profile error:', error);
    
    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A provider with this email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save provider profile' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const provider = await prisma.serviceProvider.findUnique({
      where: { email }
    });

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ provider });

  } catch (error) {
    console.error('Get provider profile error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve provider profile' },
      { status: 500 }
    );
  }
}