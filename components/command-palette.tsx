'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  items: CommandItem[];
}

export function CommandPalette({ items }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev,
        );
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
      if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-background rounded-lg shadow-lg border">
              <div className="flex items-center gap-2 p-4 border-b">
                <Command className="size-4 text-muted-foreground" />
                <Input
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-0 shadow-none focus-visible:ring-0"
                  autoFocus
                />
              </div>
              <div className="p-2 max-h-[300px] overflow-y-auto">
                {filteredItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={cn(
                      'flex items-center gap-2 w-full p-2 rounded-md text-left',
                      'hover:bg-accent hover:text-accent-foreground',
                      selectedIndex === index &&
                        'bg-accent text-accent-foreground',
                    )}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    {item.icon && <div className="size-4">{item.icon}</div>}
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </motion.button>
                ))}
                {filteredItems.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No results found
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
