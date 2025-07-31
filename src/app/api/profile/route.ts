import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/profile - Get user profile
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        orders: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update user profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      firstName,
      lastName,
      email,
      phone,
      bio,
      address,
      city,
      state,
      country,
      postalCode,
      skills
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Update user basic information
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email
      }
    });

    // Calculate profile completeness
    const requiredFields = [firstName, lastName, email, phone, address, city, state, country];
    const filledFields = requiredFields.filter(field => field && field.trim() !== '');
    const isComplete = filledFields.length === requiredFields.length;

    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        phone,
        bio,
        address,
        city,
        state,
        country,
        postalCode,
        skills: skills || null,
        isComplete
      },
      create: {
        userId,
        phone,
        bio,
        address,
        city,
        state,
        country,
        postalCode,
        skills: skills || null,
        isComplete
      }
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
      profile
    }, { status: 200 });

  } catch (error: unknown) {
    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// POST /api/profile - Create new user and profile
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      userType,
      phone,
      bio,
      address,
      city,
      state,
      country,
      postalCode,
      skills
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        userType
      }
    });

    // Calculate profile completeness
    const requiredFields = [firstName, lastName, email, phone, address, city, state, country];
    const filledFields = requiredFields.filter(field => field && field.trim() !== '');
    const isComplete = filledFields.length === requiredFields.length;

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        phone,
        bio,
        address,
        city,
        state,
        country,
        postalCode,
        skills: skills || null,
        isComplete
      }
    });

    return NextResponse.json({
      message: 'Profile created successfully',
      user,
      profile
    }, { status: 201 });

  } catch (error: unknown) {
    // Handle unique constraint violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}