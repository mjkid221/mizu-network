import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  pages: {
    signIn: '/',
    newUser: '/home',
    signOut: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Handle API routes first
      if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
        return isLoggedIn;
      }

      // Handle login page
      if (pathname === '/') {
        if (isLoggedIn) {
          return Response.redirect(new URL('/home', nextUrl));
        }

        const { searchParams } = nextUrl;
        const referralCode = searchParams.get('ref');
        if (referralCode) {
          const response = NextResponse.next();
          response.cookies.set('referralCode', referralCode, {
            httpOnly: false,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });
          return response;
        }
        return true;
      }

      // Handle chat/home pages
      if (pathname.startsWith('/home')) {
        return isLoggedIn;
      }

      return true; // Allow access to all other pages
    },
  },
} satisfies NextAuthConfig;
