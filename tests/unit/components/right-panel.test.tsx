import { act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  useUIStore,
  DEFAULT_RIGHT_PANEL_WIDTH,
  MIN_RIGHT_PANEL_WIDTH,
  MAX_RIGHT_PANEL_WIDTH,
} from '@/store/ui-store';

describe('Right Panel State in UIStore', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.getState().setActiveRightPanel(null);
      useUIStore.getState().resetRightPanelWidth();
      useUIStore.getState().setIsRightResizing(false);
    });
  });

  it('initializes with default right panel width and inactive state', () => {
    const state = useUIStore.getState();
    expect(state.activeRightPanel).toBeNull();
    expect(state.rightPanelWidth).toBe(DEFAULT_RIGHT_PANEL_WIDTH);
    expect(state.isRightResizing).toBe(false);
  });

  it('toggles chat, mcp, theme, telemetry and i18n panels correctly', () => {
    act(() => {
      useUIStore.getState().toggleRightPanel('chat');
    });
    expect(useUIStore.getState().activeRightPanel).toBe('chat');

    // Toggling chat again closes it
    act(() => {
      useUIStore.getState().toggleRightPanel('chat');
    });
    expect(useUIStore.getState().activeRightPanel).toBeNull();

    // Toggling mcp opens mcp
    act(() => {
      useUIStore.getState().toggleRightPanel('mcp');
    });
    expect(useUIStore.getState().activeRightPanel).toBe('mcp');

    // Toggling theme switches to theme
    act(() => {
      useUIStore.getState().toggleRightPanel('theme');
    });
    expect(useUIStore.getState().activeRightPanel).toBe('theme');

    // Toggling telemetry switches to telemetry
    act(() => {
      useUIStore.getState().toggleRightPanel('telemetry');
    });
    expect(useUIStore.getState().activeRightPanel).toBe('telemetry');

    // Toggling i18n switches to i18n
    act(() => {
      useUIStore.getState().toggleRightPanel('i18n');
    });
    expect(useUIStore.getState().activeRightPanel).toBe('i18n');
  });

  it('clamps right panel width between min and max bounds', () => {
    act(() => {
      useUIStore.getState().setRightPanelWidth(100); // below min
    });
    expect(useUIStore.getState().rightPanelWidth).toBe(MIN_RIGHT_PANEL_WIDTH);

    act(() => {
      useUIStore.getState().setRightPanelWidth(999); // above max
    });
    expect(useUIStore.getState().rightPanelWidth).toBe(MAX_RIGHT_PANEL_WIDTH);

    act(() => {
      useUIStore.getState().resetRightPanelWidth();
    });
    expect(useUIStore.getState().rightPanelWidth).toBe(DEFAULT_RIGHT_PANEL_WIDTH);
  });
});
