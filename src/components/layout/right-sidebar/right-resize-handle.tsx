import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GripVertical } from 'lucide-react';
import {
  useUIStore,
  MIN_RIGHT_PANEL_WIDTH,
  MAX_RIGHT_PANEL_WIDTH,
} from '@/store/ui-store';
import { cn } from '@/lib/utils';

export interface RightResizeHandleProps {
  className?: string;
}

export const RightResizeHandle: React.FC<RightResizeHandleProps> = ({ className }) => {
  const {
    rightPanelWidth,
    isRightResizing,
    setRightPanelWidth,
    setIsRightResizing,
    resetRightPanelWidth,
    setActiveRightPanel,
  } = useUIStore();

  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);

  const startResizing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      setIsRightResizing(true);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    },
    [setIsRightResizing]
  );

  useEffect(() => {
    const handlePointerMove = (clientX: number) => {
      if (!isDraggingRef.current) return;

      // Distance from right edge of the viewport
      const newWidth = window.innerWidth - clientX;

      // Snap collapse if dragged too close to the right edge
      if (newWidth < 180) {
        setActiveRightPanel(null);
      } else {
        const clamped = Math.min(Math.max(newWidth, MIN_RIGHT_PANEL_WIDTH), MAX_RIGHT_PANEL_WIDTH);
        setRightPanelWidth(clamped);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
      }
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsRightResizing(false);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
    window.addEventListener('touchcancel', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('touchcancel', handlePointerUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [setIsRightResizing, setRightPanelWidth, setActiveRightPanel]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    resetRightPanelWidth();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setRightPanelWidth(rightPanelWidth + 16);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setRightPanelWidth(rightPanelWidth - 16);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      resetRightPanelWidth();
    }
  };

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation="vertical"
      aria-valuenow={rightPanelWidth}
      aria-valuemin={MIN_RIGHT_PANEL_WIDTH}
      aria-valuemax={MAX_RIGHT_PANEL_WIDTH}
      aria-label="Resize Right Panel"
      onMouseDown={startResizing}
      onTouchStart={startResizing}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group absolute -left-2 top-0 z-50 h-full w-4 cursor-col-resize select-none flex items-center justify-center outline-none transition-colors duration-150',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        className
      )}
      title="Drag to resize, double-click to reset"
    >
      {/* Visual Line */}
      <div
        className={cn(
          'h-full w-[2px] transition-all duration-200',
          isRightResizing
            ? 'w-[3px] bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]'
            : isHovered
            ? 'w-[2px] bg-primary/70 shadow-xs'
            : 'bg-transparent group-hover:bg-primary/50'
        )}
      />

      {/* Center Grip Pill */}
      <div
        className={cn(
          'absolute flex h-7 w-3.5 items-center justify-center rounded-xs border border-border bg-card shadow-xs transition-all duration-150',
          isRightResizing
            ? 'scale-110 border-primary bg-primary text-primary-foreground opacity-100 shadow-md'
            : isHovered
            ? 'opacity-100 scale-100 border-primary/60 text-primary'
            : 'opacity-0 group-hover:opacity-100 text-muted-foreground'
        )}
      >
        <GripVertical className="h-3 w-3" />
      </div>

      {/* Live Width Tooltip during Drag */}
      {isRightResizing && (
        <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 z-50 flex items-center rounded-md bg-foreground px-2 py-1 text-[11px] font-mono font-medium text-background shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95">
          <span>{`${Math.round(rightPanelWidth)}px`}</span>
        </div>
      )}
    </div>
  );
};
