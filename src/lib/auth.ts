import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'CUSTOMER' | 'PROVIDER';
  emailVerified: boolean;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken(userId);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateSession(token: string): Promise<AuthUser | null> {
  try {
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      // Clean up expired session
      if (session) {
        await prisma.session.delete({ where: { id: session.id } });
      }
      return null;
    }

    return {
      id: session.user.id,
      email: session.user.email,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      userType: session.user.userType,
      emailVerified: session.user.emailVerified,
    };
  } catch {
    return null;
  }
}

export async function deleteSession(token: string): Promise<void> {
  try {
    await prisma.session.deleteMany({
      where: { token },
    });
  } catch {
    // Ignore errors when deleting sessions
  }
}

export function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function createEmailVerificationToken(userId: string): Promise<string> {
  const token = generateVerificationToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours

  await prisma.verificationToken.create({
    data: {
      userId,
      token,
      type: 'EMAIL_VERIFICATION',
      expiresAt,
    },
  });

  return token;
}

export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = generateVerificationToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateEmailVerificationToken(token: string): Promise<string | null> {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.expiresAt < new Date()) {
      return null;
    }

    // Delete the token after use
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return verificationToken.userId;
  } catch {
    return null;
  }
}

export async function validatePasswordResetToken(token: string): Promise<string | null> {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expiresAt < new Date() || resetToken.used) {
      return null;
    }

    return resetToken.userId;
  } catch {
    return null;
  }
}

export async function markPasswordResetTokenUsed(token: string): Promise<void> {
  try {
    await prisma.passwordResetToken.updateMany({
      where: { token },
      data: { used: true },
    });
  } catch {
    // Ignore errors
  }
}