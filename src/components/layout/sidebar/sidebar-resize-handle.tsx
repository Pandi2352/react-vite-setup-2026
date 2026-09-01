import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { useSidebarResize } from '@/hooks/use-sidebar-resize';
import { cn } from '@/lib/utils';

export interface SidebarResizeHandleProps {
  className?: string;
}

export const SidebarResizeHandle: React.FC<SidebarResizeHandleProps> = ({ className }) => {
  const {
    sidebarWidth,
    sidebarCollapsed,
    isResizing,
    minWidth,
    maxWidth,
    startResizing,
    handleDoubleClick,
    handleKeyDown,
  } = useSidebarResize();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation="vertical"
      aria-valuenow={sidebarCollapsed ? 64 : sidebarWidth}
      aria-valuemin={minWidth}
      aria-valuemax={maxWidth}
      aria-label="Resize Sidebar"
      onMouseDown={startResizing}
      onTouchStart={startResizing}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group absolute -right-2 top-0 z-50 h-full w-4 cursor-col-resize select-none flex items-center justify-center outline-none transition-colors duration-150',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        isResizing && 'cursor-col-resize',
        className
      )}
      title="Drag to resize, double-click to reset"
    >
      {/* Visual Accent Line */}
      <div
        className={cn(
          'h-full w-[2px] transition-all duration-200',
          isResizing
            ? 'w-[3px] bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]'
            : isHovered
            ? 'w-[2px] bg-primary/70 shadow-xs'
            : 'bg-transparent group-hover:bg-primary/50'
        )}
      />

      {/* Grip Handle Center Pill */}
      <div
        className={cn(
          'absolute flex h-7 w-3.5 items-center justify-center rounded-xs border border-border bg-card shadow-xs transition-all duration-150',
          isResizing
            ? 'scale-110 border-primary bg-primary text-primary-foreground opacity-100 shadow-md'
            : isHovered
            ? 'opacity-100 scale-100 border-primary/60 text-primary'
            : 'opacity-0 group-hover:opacity-100 text-muted-foreground'
        )}
      >
        <GripVertical className="h-3 w-3" />
      </div>

      {/* Live Width Indicator Tooltip during Dragging */}
      {isResizing && (
        <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 z-50 flex items-center rounded-md bg-foreground px-2 py-1 text-[11px] font-mono font-medium text-background shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95">
          <span>{sidebarCollapsed ? 'Collapsed (64px)' : `${Math.round(sidebarWidth)}px`}</span>
        </div>
      )}
    </div>
  );
};
