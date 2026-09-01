import { useCallback, useEffect, useRef } from 'react';
import {
  useUIStore,
  MIN_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  DEFAULT_SIDEBAR_WIDTH,
} from '@/store/ui-store';

const SNAP_COLLAPSE_THRESHOLD = 130;
const KEYBOARD_STEP = 16;

export interface UseSidebarResizeOptions {
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
}

export const useSidebarResize = (options: UseSidebarResizeOptions = {}) => {
  const {
    minWidth = MIN_SIDEBAR_WIDTH,
    maxWidth = MAX_SIDEBAR_WIDTH,
    defaultWidth = DEFAULT_SIDEBAR_WIDTH,
  } = options;

  const {
    sidebarWidth,
    sidebarCollapsed,
    isResizing,
    setSidebarWidth,
    setIsResizing,
    setSidebarCollapsed,
    resetSidebarWidth,
  } = useUIStore();

  const isDraggingRef = useRef(false);

  // Start resizing on MouseDown
  const startResizing = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      setIsResizing(true);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    },
    [setIsResizing]
  );

  // Window listeners for smooth, buttery 60fps tracking
  useEffect(() => {
    const handlePointerMove = (clientX: number) => {
      if (!isDraggingRef.current) return;

      if (clientX < SNAP_COLLAPSE_THRESHOLD) {
        if (!sidebarCollapsed) {
          setSidebarCollapsed(true);
        }
      } else {
        if (sidebarCollapsed) {
          setSidebarCollapsed(false);
        }
        const newWidth = Math.min(Math.max(clientX, minWidth), maxWidth);
        setSidebarWidth(newWidth);
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
        setIsResizing(false);
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
  }, [sidebarCollapsed, minWidth, maxWidth, setIsResizing, setSidebarCollapsed, setSidebarWidth]);

  // Handle double-click to reset or toggle collapse
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (sidebarCollapsed) {
        setSidebarCollapsed(false);
        setSidebarWidth(defaultWidth);
      } else if (sidebarWidth === defaultWidth) {
        setSidebarCollapsed(true);
      } else {
        resetSidebarWidth();
      }
    },
    [sidebarCollapsed, sidebarWidth, defaultWidth, setSidebarCollapsed, setSidebarWidth, resetSidebarWidth]
  );

  // Handle accessible keyboard events
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (sidebarCollapsed) return;
          if (sidebarWidth - KEYBOARD_STEP < minWidth) {
            setSidebarCollapsed(true);
          } else {
            setSidebarWidth(sidebarWidth - KEYBOARD_STEP);
          }
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (sidebarCollapsed) {
            setSidebarCollapsed(false);
            setSidebarWidth(minWidth);
          } else {
            setSidebarWidth(sidebarWidth + KEYBOARD_STEP);
          }
          break;

        case 'Home':
          e.preventDefault();
          if (sidebarCollapsed) {
            setSidebarCollapsed(false);
          }
          setSidebarWidth(minWidth);
          break;

        case 'End':
          e.preventDefault();
          if (sidebarCollapsed) {
            setSidebarCollapsed(false);
          }
          setSidebarWidth(maxWidth);
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          resetSidebarWidth();
          break;

        default:
          break;
      }
    },
    [sidebarCollapsed, sidebarWidth, minWidth, maxWidth, setSidebarCollapsed, setSidebarWidth, resetSidebarWidth]
  );

  return {
    sidebarWidth,
    sidebarCollapsed,
    isResizing,
    minWidth,
    maxWidth,
    defaultWidth,
    startResizing,
    handleDoubleClick,
    handleKeyDown,
    resetSidebarWidth,
  };
};
