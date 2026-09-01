import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useSidebarResize } from '@/hooks/use-sidebar-resize';
import { useUIStore, DEFAULT_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH, MAX_SIDEBAR_WIDTH } from '@/store/ui-store';

describe('useSidebarResize Hook', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().resetSidebarWidth();
      useUIStore.getState().setSidebarCollapsed(false);
      useUIStore.getState().setIsResizing(false);
    });
  });

  it('provides default sidebar width and state', () => {
    const { result } = renderHook(() => useSidebarResize());

    expect(result.current.sidebarWidth).toBe(DEFAULT_SIDEBAR_WIDTH);
    expect(result.current.sidebarCollapsed).toBe(false);
    expect(result.current.isResizing).toBe(false);
    expect(result.current.minWidth).toBe(MIN_SIDEBAR_WIDTH);
    expect(result.current.maxWidth).toBe(MAX_SIDEBAR_WIDTH);
  });

  it('handles keyboard navigation (ArrowRight / ArrowLeft / Home / End)', () => {
    const { result } = renderHook(() => useSidebarResize());

    // ArrowRight increases width
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowRight',
        preventDefault: () => {},
      } as any);
    });
    expect(result.current.sidebarWidth).toBe(DEFAULT_SIDEBAR_WIDTH + 16);

    // ArrowLeft decreases width
    act(() => {
      result.current.handleKeyDown({
        key: 'ArrowLeft',
        preventDefault: () => {},
      } as any);
    });
    expect(result.current.sidebarWidth).toBe(DEFAULT_SIDEBAR_WIDTH);

    // End sets to max width
    act(() => {
      result.current.handleKeyDown({
        key: 'End',
        preventDefault: () => {},
      } as any);
    });
    expect(result.current.sidebarWidth).toBe(MAX_SIDEBAR_WIDTH);

    // Home sets to min width
    act(() => {
      result.current.handleKeyDown({
        key: 'Home',
        preventDefault: () => {},
      } as any);
    });
    expect(result.current.sidebarWidth).toBe(MIN_SIDEBAR_WIDTH);
  });

  it('handles double click reset', () => {
    const { result } = renderHook(() => useSidebarResize());

    act(() => {
      useUIStore.getState().setSidebarWidth(320);
    });
    expect(result.current.sidebarWidth).toBe(320);

    act(() => {
      result.current.handleDoubleClick({ preventDefault: () => {} } as any);
    });
    expect(result.current.sidebarWidth).toBe(DEFAULT_SIDEBAR_WIDTH);
  });
});
