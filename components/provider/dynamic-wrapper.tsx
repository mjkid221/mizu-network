'use client';
import {
  DynamicContextProvider,
  getAuthToken,
} from '@dynamic-labs/sdk-react-core';
import { SuiWalletConnectors } from '@dynamic-labs/sui';
import { signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { AuthLoading } from '../auth-loading';
import { AnimatePresence } from 'framer-motion';

export default function DynamicWrapper({
  children,
}: { children: React.ReactNode }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  return (
    <>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || '',
          walletConnectors: [SuiWalletConnectors],
          events: {
            onAuthSuccess: async (event) => {
              setIsAuthenticating(true);
              try {
                await signIn('credentials', {
                  token: getAuthToken(),
                  redirectTo: '/home',
                  redirect: true,
                });
              } catch (error) {
                console.error('Auth error:', error);
                setIsAuthenticating(false);
              }
            },
            onLogout: async (event) => {
              await signOut({
                redirectTo: '/',
                redirect: true,
              });
            },
          },
        }}
      >
        {children}
      </DynamicContextProvider>

      <AnimatePresence>{isAuthenticating && <AuthLoading />}</AnimatePresence>
    </>
  );
}
