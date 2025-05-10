'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AppleIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MacOSLoadingScreenProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode;
  text?: string;
  duration?: number;
  onComplete?: () => Promise<void> | void;
}

export function MacOSLoadingScreen({
  className,
  logo,
  text,
  duration = 3000,
  onComplete,
  ...props
}: MacOSLoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) {
            onComplete();
          }
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-8 px-4">
        {logo || <AppleIcon className="h-16 w-16 text-foreground" />}

        <div className="w-full max-w-md">
          <Progress value={progress} className="h-1.5 w-full bg-muted" />
        </div>

        {text && (
          <p className="text-sm text-muted-foreground font-medium">{text}</p>
        )}
      </div>
    </div>
  );
}
