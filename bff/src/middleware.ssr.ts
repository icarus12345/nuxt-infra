// import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';
// import { APP_ADMIN_ROUTES, APP_ROUTES } from '@ui/Common/routes/app.router';


// export default withAuth(
//   function middleware(request: NextRequestWithAuth) {
//     if (request.nextUrl.pathname === '/' && !request.nextauth.token) {
//       return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url));
//     }

//     if (
//       request.nextUrl.pathname === '/' &&
//       request.nextauth.token?.role === 'member'
//     ) {
//       return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, request.url));
//     }

//     if (
//       request.nextUrl.pathname === '/' &&
//       request.nextauth.token?.role === 'admin'
//     ) {
//       return NextResponse.redirect(
//         new URL(APP_ADMIN_ROUTES.DASHBOARD(), request.url)
//       );
//     }

//     if (
//       request.nextUrl.pathname.startsWith('/admin') &&
//       request.nextauth.token?.role !== 'admin'
//     ) {
//       return NextResponse.redirect(new URL('/forbidden', request.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// );
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = { matcher: ['/', '/admin/:path*'] };
