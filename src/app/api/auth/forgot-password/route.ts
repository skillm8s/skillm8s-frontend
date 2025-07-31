import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPasswordResetToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { message: 'If an account with that email exists, a password reset link has been sent.' },
        { status: 200 }
      );
    }

    // Create password reset token
    const resetToken = await createPasswordResetToken(user.id);

    // Send password reset email
    const emailSent = await sendPasswordResetEmail(user.email, resetToken, user.firstName);

    return NextResponse.json(
      {
        message: 'If an account with that email exists, a password reset link has been sent.',
        emailSent,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}