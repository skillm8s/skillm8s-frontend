import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateEmailVerificationToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Validate the token
    const userId = await validateEmailVerificationToken(token);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user email verification status
    const user = await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        emailVerified: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        user,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Validate the token
    const userId = await validateEmailVerificationToken(token);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Update user email verification status
    const user = await prisma.user.update({
      where: { id: userId },
      data: { emailVerified: true },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        userType: true,
        emailVerified: true,
      },
    });

    return NextResponse.json(
      {
        message: 'Email verified successfully',
        user,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}