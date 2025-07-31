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
    const provider = await prisma.provider.findUnique({
      where: { id: providerId }
    });

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ provider });
  } catch (error) {
    console.error('Error fetching provider:', error);
    return NextResponse.json(
      { error: 'Failed to fetch provider' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { providerId, bufferTime, services } = body;

    if (!providerId) {
      return NextResponse.json(
        { error: 'Provider ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (bufferTime !== undefined) updateData.bufferTime = bufferTime;
    if (services !== undefined) updateData.services = services;

    const updatedProvider = await prisma.provider.update({
      where: { id: providerId },
      data: updateData
    });

    return NextResponse.json(
      { 
        message: 'Provider settings updated successfully',
        provider: updatedProvider
      }
    );
  } catch (error) {
    console.error('Error updating provider:', error);
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phoneNumber, services, bufferTime } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400 }
      );
    }

    // Check if provider already exists
    const existingProvider = await prisma.provider.findUnique({
      where: { email }
    });

    if (existingProvider) {
      return NextResponse.json(
        { error: 'Provider with this email already exists' },
        { status: 409 }
      );
    }

    const provider = await prisma.provider.create({
      data: {
        email,
        firstName,
        lastName,
        phoneNumber,
        services,
        bufferTime: bufferTime || 15
      }
    });

    return NextResponse.json(
      { 
        message: 'Provider created successfully',
        provider
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating provider:', error);
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    );
  }
}