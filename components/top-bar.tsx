'use client';
import { CommandPalette } from '@/components/command-palette';
import {
  BookOpen,
  Github,
  Twitter,
  MessageSquare,
  User,
  LogOut,
} from 'lucide-react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useSession } from 'next-auth/react';

export function TopBar() {
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

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
    ...(isAuthenticated
      ? [
          {
            id: 'logout',
            title: 'Logout',
            description: 'Logout from Mizu AI',
            icon: <LogOut className="size-4" />,
            action: handleLogOut,
          },
        ]
      : [
          {
            id: 'login',
            title: 'Login',
            description: 'Login to Mizu AI',
            icon: <User className="size-4" />,
            action: openLoginModal,
          },
        ]),
  ];

  return (
    <>
      <CommandPalette items={commandItems} />
      <div className="fixed top-0 inset-x-0 h-8 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4 z-50">
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
    </>
  );
}
