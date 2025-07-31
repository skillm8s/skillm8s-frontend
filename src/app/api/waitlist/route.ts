import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      userType,
      country,
      state,
      city,
      services
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !userType || !country || !state || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        firstName,
        lastName,
        email,
        userType,
        country,
        state,
        city,
        services: services.length > 0 ? services : null,
      },
    });

    return NextResponse.json(
      { message: 'Successfully joined waitlist', entry },
      { status: 201 }
    );

  } catch (error: unknown) {
    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
} 