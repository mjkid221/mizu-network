import NextAuth, { type User, type Session, type Profile } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';

import { authConfig } from './auth.config';
import { validateJWT } from '@/lib/auth/validate';
import { createUser, getUser } from '@/lib/db/queries';
import { cookies } from 'next/headers';
import { sec } from 'ms-extended';

interface ExtendedUser extends User {
  sub?: string;
}

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
    maxAge: sec('30 day'),
  },
  providers: [
    Credentials({
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(
        credentials: Partial<Record<'token', unknown>>,
      ): Promise<ExtendedUser | null> {
        try {
          const token = credentials.token as string;
          if (typeof token !== 'string' || !token) {
            throw new Error('Token is required');
          }
          const jwtPayload = await validateJWT(token);

          if (!jwtPayload?.sub) {
            return null;
          }

          // set cookie
          (await cookies()).set('dynamic_authentication_token', token, {
            httpOnly: false,
            maxAge: jwtPayload.exp,
            path: '/',
          });

          return {
            sub: jwtPayload.sub,
            email: jwtPayload.email,
            name:
              jwtPayload.email ??
              jwtPayload.verified_credentials.find(
                (c: { address?: string }) => !!c.address,
              )?.address,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({
      user,
    }: {
      user: ExtendedUser;
    }) {
      try {
        if (!user?.sub) {
          throw new Error('Missing sub in user data');
        }

        // Check if user exists
        const [existingUser] = await getUser(user.sub);

        if (existingUser) {
          user.id = existingUser.id;
          return true;
        }

        // Create new user if they don't exist
        const [createdUser] = await createUser({
          dynamicId: user.sub,
        });

        // Update user object with new database info
        user.id = createdUser.id;
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return false;
      }
    },
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: ExtendedUser;
      profile?: Profile;
    }) {
      if (user) {
        token.id = user.id;
        token.sub = user.sub;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: JWT;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.sub = token.sub as string;
      }
      return session;
    },
  },
});
