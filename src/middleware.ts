import { NextResponse } from 'next/server'

export function middleware() {
  // Allow services routes to pass through
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
} 