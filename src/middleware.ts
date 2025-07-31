import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for public routes and API routes
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/verify-email', '/auth/forgot-password', '/auth/reset-password', '/']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))
  const isApiRoute = pathname.startsWith('/api/')
  
  if (isPublicRoute || isApiRoute) {
    return NextResponse.next()
  }
  
  // Check authentication for protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    const sessionToken = request.cookies.get('session')?.value
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    
    try {
      const user = await validateSession(sessionToken)
      if (!user) {
        const response = NextResponse.redirect(new URL('/auth/login', request.url))
        response.cookies.delete('session')
        return response
      }
      
      // Add user info to headers for use in components
      const response = NextResponse.next()
      response.headers.set('x-user-id', user.id)
      response.headers.set('x-user-email', user.email)
      response.headers.set('x-user-type', user.userType)
      return response
      
    } catch (error) {
      console.error('Session validation error:', error)
      const response = NextResponse.redirect(new URL('/auth/login', request.url))
      response.cookies.delete('session')
      return response
    }
  }
  
  // Check if the request path starts with /services (original functionality)
  if (pathname.startsWith('/services')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/services/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*'
  ]
} 