import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const protectedPaths = [
    '/dashboard/student',
    '/dashboard/admin',
    '/dashboard/facility-admin',
    '/dashboard/staff',
    '/dashboard/parent',
    '/dashboard/vendor',
  ];
  const isProtected = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isProtected && !request.cookies.has('jwt')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};