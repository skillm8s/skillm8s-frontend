import { NextResponse } from 'next/server';

interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  providerId: string;
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  serviceAddress: string;
  addressLat: number | null;
  addressLng: number | null;
  requirements: string | null;
  estimatedPrice: number | null;
  finalPrice: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Mock bookings storage (in reality, this would be stored in database)
const mockBookings: Booking[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      serviceId,
      providerId,
      date,
      time,
      address,
      addressLat,
      addressLng,
      customerName,
      customerEmail,
      customerPhone,
      requirements,
      duration,
      estimatedPrice,
    } = body;

    // Validate required fields
    if (!serviceId || !providerId || !date || !time || !address || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate booking ID
    const bookingId = 'BK' + Date.now().toString() + Math.random().toString(36).substr(2, 5);

    // Create booking object
    const booking = {
      id: bookingId,
      customerId: 'guest', // For now, all bookings are guest bookings
      customerName,
      customerEmail,
      customerPhone: customerPhone || null,
      providerId,
      serviceId,
      scheduledDate: new Date(date).toISOString(),
      scheduledTime: time,
      duration,
      serviceAddress: address,
      addressLat: addressLat || null,
      addressLng: addressLng || null,
      requirements: requirements || null,
      estimatedPrice: estimatedPrice || null,
      finalPrice: null,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store booking (in reality, save to database)
    mockBookings.push(booking);

    // Log the booking for demonstration
    console.log('New booking created:', booking);

    return NextResponse.json(
      { 
        message: 'Booking created successfully',
        booking: {
          id: booking.id,
          status: booking.status,
          scheduledDate: booking.scheduledDate,
          scheduledTime: booking.scheduledTime,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const email = searchParams.get('email');

    let filteredBookings = mockBookings;

    if (customerId) {
      filteredBookings = filteredBookings.filter(booking => booking.customerId === customerId);
    }

    if (email) {
      filteredBookings = filteredBookings.filter(booking => booking.customerEmail === email);
    }

    return NextResponse.json(filteredBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}