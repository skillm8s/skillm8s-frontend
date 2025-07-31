import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const providerId = searchParams.get('providerId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!providerId) {
    return NextResponse.json(
      { error: 'Provider ID is required' },
      { status: 400 }
    );
  }

  try {
    const whereClause: Record<string, unknown> = { providerId };
    
    if (startDate && endDate) {
      whereClause.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: { startTime: 'asc' }
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      providerId,
      startTime,
      duration,
      customerName,
      customerEmail,
      customerPhone,
      serviceType,
      description
    } = body;

    // Validate required fields
    if (!providerId || !startTime || !duration || !customerName || !customerEmail || !serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate end time
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000); // duration in minutes

    // Check for conflicts with existing bookings
    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        providerId,
        status: { not: 'cancelled' },
        OR: [
          {
            AND: [
              { startTime: { lte: start } },
              { endTime: { gt: start } }
            ]
          },
          {
            AND: [
              { startTime: { lt: end } },
              { endTime: { gte: end } }
            ]
          },
          {
            AND: [
              { startTime: { gte: start } },
              { endTime: { lte: end } }
            ]
          }
        ]
      }
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { error: 'Time slot already booked' },
        { status: 409 }
      );
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        providerId,
        startTime: start,
        endTime: end,
        duration,
        customerName,
        customerEmail,
        customerPhone,
        serviceType,
        description,
        status: 'pending'
      }
    });

    return NextResponse.json(
      { 
        message: 'Booking created successfully',
        booking
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, status, providerId } = body;

    if (!bookingId || !status || !providerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { 
        id: bookingId,
        providerId // Ensure provider owns this booking
      },
      data: { status }
    });

    return NextResponse.json(
      { 
        message: 'Booking status updated successfully',
        booking: updatedBooking
      }
    );
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}