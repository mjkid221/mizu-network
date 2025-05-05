'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const messages = [
  'Verifying your credentials...',
  'Waking up Mizu...',
  'Dusting off your digital ID...',
  'Teaching hamsters to verify wallets...',
  'Warming up the blockchain...',
  'Checking if servers are awake...',
  'Convincing pixels to align properly...',
  'Reticulating authentication splines...',
  'Preparing your Web3 adventure...',
  'Making sure everything is awesome...',
  'Tuning the quantum authenticator...',
];

export function AuthLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#ffffff]/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl p-6 rounded-xl flex flex-col items-center gap-6 max-w-[280px] w-full mx-4 shadow-2xl"
      >
        {/* macOS-style spinner */}
        <div className="relative size-6">
          <motion.div
            className="absolute inset-0 origin-[50%_50%]"
            initial={{ opacity: 0.2 }}
            animate={{
              rotate: 360,
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              rotate: {
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              },
              opacity: {
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              },
            }}
          >
            <svg
              className="size-6 text-black/80 dark:text-white/80"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                opacity="0.25"
              />
              <path
                fill="currentColor"
                d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0A1.5,1.5,0,0,0,23,10.5h0A11,11,0,0,0,12,1"
              />
            </svg>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-[15px] font-medium text-black/90 dark:text-white/90">
            Signing In
          </h2>
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[13px] text-black/60 dark:text-white/60 text-center min-h-[1.5em]"
          >
            {messages[messageIndex]}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
