'use client';

import React, { useEffect, useState } from 'react';
import { MacOSLoadingScreen } from './ui/macos-loading-screen';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

interface MacOSLoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  text?: string;
  duration?: number;
  onComplete?: () => Promise<void> | void;
}

export function LoadingScreen({ ...props }: MacOSLoadingScreenProps) {
  const { handleLogOut } = useDynamicContext();
  const [isComplete, setIsComplete] = useState(false);

  const logout = async () => {
    await handleLogOut();
  };

  useEffect(() => {
    if (isComplete) {
      logout();
    }
  }, [isComplete]);

  return (
    <MacOSLoadingScreen
      duration={1500}
      onComplete={() => setIsComplete(true)}
      {...props}
    />
  );
}
