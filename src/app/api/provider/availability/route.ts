import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get('providerId');

  if (!providerId) {
    return NextResponse.json(
      { error: 'Provider ID is required' },
      { status: 400 }
    );
  }

  try {
    const availabilities = await prisma.availability.findMany({
      where: { providerId },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    });

    return NextResponse.json({ availabilities });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { providerId, availabilities } = body;

    if (!providerId || !availabilities || !Array.isArray(availabilities)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Delete existing availability patterns for this provider
    await prisma.availability.deleteMany({
      where: { 
        providerId,
        specificDate: null // Only delete recurring patterns
      }
    });

    // Create new availability patterns
    const createdAvailabilities = await Promise.all(
      availabilities
        .filter(av => av.isEnabled)
        .map(availability => 
          prisma.availability.create({
            data: {
              providerId,
              dayOfWeek: availability.dayOfWeek,
              startTime: availability.startTime,
              endTime: availability.endTime,
              isRecurring: true,
            }
          })
        )
    );

    return NextResponse.json(
      { 
        message: 'Availability patterns saved successfully',
        availabilities: createdAvailabilities
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving availability:', error);
    return NextResponse.json(
      { error: 'Failed to save availability' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { providerId, availabilityId, updates } = body;

    if (!providerId || !availabilityId || !updates) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const updatedAvailability = await prisma.availability.update({
      where: { 
        id: availabilityId,
        providerId // Ensure provider owns this availability
      },
      data: updates
    });

    return NextResponse.json(
      { 
        message: 'Availability updated successfully',
        availability: updatedAvailability
      }
    );
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    );
  }
}