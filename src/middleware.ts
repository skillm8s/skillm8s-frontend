import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request path starts with /services
  if (request.nextUrl.pathname.startsWith('/services')) {
    // Redirect to home page or show a 404
    return NextResponse.redirect(new URL('/', request.url))
    // Alternatively, for a 404:
    // return NextResponse.rewrite(new URL('/404', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/services/:path*'
} 