'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { Button } from '@/components/ui/button';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Page() {
  const { setShowAuthFlow } = useDynamicContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const openLoginModal = () => {
    setShowAuthFlow(true);
  };

  return (
    <WavyBackground
      className="max-w-4xl mx-auto pb-40 relative h-screen"
      colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-screen">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl md:text-7xl">
                Mizu AI
              </h1>
              <p className="mt-6 text-lg text-zinc-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)] sm:text-xl">
                Your intelligent companion for the Sui blockchain
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="h-12 bg-white/90 hover:bg-white/95 text-black shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-200"
                  onClick={openLoginModal}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 bg-black/10 hover:bg-black/20 text-white border-white/20 shadow-lg backdrop-blur-sm transition-all duration-200"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}
