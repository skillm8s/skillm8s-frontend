import { NextResponse } from 'next/server';
import { validateSession } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = await validateSession(sessionToken);

    return NextResponse.json({ user }, { status: 200 });

  } catch (error: unknown) {
    console.error('Get user error:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}