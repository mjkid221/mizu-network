import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { sec } from 'ms-extended';

const authToken = 'dynamic_authentication_token';
export const authConfig = {
  pages: {
    signIn: '/',
    newUser: '/home',
    signOut: '/',
    error: '/refresh',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const dynamicAuthenticationToken = (await cookies()).get(
        authToken,
      )?.value;
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (
        dynamicAuthenticationToken &&
        !isLoggedIn &&
        !['/refresh', '/'].includes(pathname)
      ) {
        (await cookies()).delete(authToken);
        return Response.redirect(new URL('/refresh', nextUrl));
      }

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
            maxAge: sec('7 day'),
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
