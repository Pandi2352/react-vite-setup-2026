import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  if (!content) return children;

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      if (position === 'right') {
        top = rect.top + rect.height / 2;
        left = rect.right + 8;
      } else if (position === 'left') {
        top = rect.top + rect.height / 2;
        left = rect.left - 8;
      } else if (position === 'bottom') {
        top = rect.bottom + 8;
        left = rect.left + rect.width / 2;
      } else {
        // top
        top = rect.top - 8;
        left = rect.left + rect.width / 2;
      }

      setCoords({ top, left });
    }
    setVisible(true);
  };

  const positionStyles = {
    top: '-translate-x-1/2 -translate-y-full animate-in fade-in zoom-in-95 slide-in-from-bottom-1',
    bottom: '-translate-x-1/2 animate-in fade-in zoom-in-95 slide-in-from-top-1',
    left: '-translate-x-full -translate-y-1/2 animate-in fade-in zoom-in-95 slide-in-from-right-1',
    right: '-translate-y-1/2 animate-in fade-in zoom-in-95 slide-in-from-left-1',
  };

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-slate-900 dark:border-t-slate-800 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-slate-900 dark:border-b-slate-800 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-slate-900 dark:border-l-slate-800 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-slate-900 dark:border-r-slate-800 border-y-transparent border-l-transparent',
  };

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-flex items-center justify-center', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setVisible(false)}
      onFocus={handleMouseEnter}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible &&
        createPortal(
          <div
            role="tooltip"
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
            className={cn(
              'fixed z-[9999] whitespace-nowrap rounded-md bg-slate-900 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-2xl border border-slate-700/60 pointer-events-none transition-all duration-150 select-none',
              positionStyles[position]
            )}
          >
            {content}
            <div className={cn('absolute w-0 h-0 border-4', arrowPositions[position])} />
          </div>,
          document.body
        )}
    </div>
  );
};
