'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { Button } from '@/components/ui/button';
import { Github, BookOpen, Twitter, MessageSquare, User } from 'lucide-react';
import { CommandPalette } from '@/components/command-palette';
import { DockDemo } from '@/components/dock';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function Home() {
  const { setShowAuthFlow } = useDynamicContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const openLoginModal = () => {
    setShowAuthFlow(true);
  };

  const commandItems = [
    {
      id: 'docs',
      title: 'Open Documentation',
      description: 'View the Mizu AI documentation',
      icon: <BookOpen className="size-4" />,
      action: () => window.open('https://docs.mizu.ai', '_blank'),
    },
    {
      id: 'github',
      title: 'Open GitHub',
      description: 'View the Mizu AI GitHub repository',
      icon: <Github className="size-4" />,
      action: () => window.open('https://github.com/mizu-ai', '_blank'),
    },
    {
      id: 'twitter',
      title: 'Open Twitter',
      description: 'Follow Mizu AI on Twitter',
      icon: <Twitter className="size-4" />,
      action: () => window.open('https://twitter.com/mizu_ai', '_blank'),
    },
    {
      id: 'discord',
      title: 'Join Discord',
      description: 'Join the Mizu AI Discord community',
      icon: <MessageSquare className="size-4" />,
      action: () => window.open('https://discord.gg/mizu-ai', '_blank'),
    },
    {
      id: 'login',
      title: 'Login',
      description: 'Login to Mizu AI',
      icon: <User className="size-4" />,
      action: openLoginModal,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <CommandPalette items={commandItems} />
      <WavyBackground
        className="max-w-4xl mx-auto pb-40 relative h-screen"
        colors={['#38bdf8', '#818cf8', '#c084fc', '#e879f9', '#22d3ee']}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Menu Bar */}
          <div className="fixed top-0 inset-x-0 h-8 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Mizu AI</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Press{' '}
                <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">
                  ⌘
                </kbd>{' '}
                +{' '}
                <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">
                  K
                </kbd>{' '}
                for commands
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="pt-8 relative h-screen">
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
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <DockDemo />
            </div>
          </div>
        </div>
      </WavyBackground>
    </div>
  );
}
