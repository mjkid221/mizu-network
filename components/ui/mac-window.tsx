import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MacWindowProps {
  className?: string;
  children: ReactNode;
  title?: string;
  showTrafficLights?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export function MacWindow({
  className,
  children,
  title = '',
  showTrafficLights = true,
  onClose,
  onMinimize,
  onMaximize,
}: MacWindowProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border bg-muted shadow-lg overflow-hidden h-full',
        className,
      )}
    >
      <div className="flex items-center h-8 px-4 bg-muted/50 border-b">
        {showTrafficLights && (
          <div className="flex items-center space-x-2 mr-4">
            <button
              type="button"
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              aria-label="Close"
            />
            <button
              type="button"
              onClick={onMinimize}
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors"
              aria-label="Minimize"
            />
            <button
              type="button"
              onClick={onMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              aria-label="Maximize"
            />
          </div>
        )}
        {title && (
          <div className="flex-1 text-center text-sm font-medium text-foreground/80">
            {title}
          </div>
        )}
        {!title && <div className="flex-1" />}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
