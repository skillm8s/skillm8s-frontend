import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, createEmailVerificationToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      userType,
      phone,
      country,
      state,
      city,
      services, // for providers
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate user type
    if (!['CUSTOMER', 'PROVIDER'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword,
        userType,
        phone,
        country,
        state,
        city,
        services: userType === 'PROVIDER' && services ? services : null,
      },
    });

    // Create email verification token
    const verificationToken = await createEmailVerificationToken(user.id);

    // Send verification email
    const emailSent = await sendVerificationEmail(user.email, verificationToken, user.firstName);

    return NextResponse.json(
      {
        message: 'User registered successfully. Please check your email to verify your account.',
        userId: user.id,
        emailSent,
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}