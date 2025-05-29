import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');  

  // Routes that require auth
  const protectedPaths = ['/dashboard', '/payment', '/profile', '/some-protected-route'];

  const pathname = request.nextUrl.pathname;

  // Check if current path is protected
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to sign-in page
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }
    // Optionally, verify token here if needed
  }

  // If route not protected or token exists, continue
  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: ['/dashboard/:path*', '/payment/:path*', '/profile/:path*', '/some-protected-route/:path*'],
};
