import { create } from 'zustand';

export const DEFAULT_SIDEBAR_WIDTH = 240;
export const MIN_SIDEBAR_WIDTH = 180;
export const MAX_SIDEBAR_WIDTH = 480;
export const COLLAPSED_SIDEBAR_WIDTH = 64;

export const DEFAULT_RIGHT_PANEL_WIDTH = 420;
export const MIN_RIGHT_PANEL_WIDTH = 320;
export const MAX_RIGHT_PANEL_WIDTH = 750;

const STORAGE_KEY_WIDTH = 'forge_sidebar_width';
const STORAGE_KEY_COLLAPSED = 'forge_sidebar_collapsed';
const STORAGE_KEY_RIGHT_WIDTH = 'forge_right_panel_width';
const STORAGE_KEY_RIGHT_PANEL = 'forge_active_right_panel';

const getInitialSidebarWidth = (): number => {
  if (typeof window === 'undefined') return DEFAULT_SIDEBAR_WIDTH;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WIDTH);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= MIN_SIDEBAR_WIDTH && parsed <= MAX_SIDEBAR_WIDTH) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage read errors
  }
  return DEFAULT_SIDEBAR_WIDTH;
};

const getInitialSidebarCollapsed = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_COLLAPSED);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch {
    // Ignore localStorage read errors
  }
  return false;
};

const getInitialRightPanelWidth = (): number => {
  if (typeof window === 'undefined') return DEFAULT_RIGHT_PANEL_WIDTH;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_RIGHT_WIDTH);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= MIN_RIGHT_PANEL_WIDTH && parsed <= MAX_RIGHT_PANEL_WIDTH) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage read errors
  }
  return DEFAULT_RIGHT_PANEL_WIDTH;
};

const getInitialActiveRightPanel = (): 'chat' | 'mcp' | 'theme' | 'telemetry' | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_RIGHT_PANEL);
    if (saved === 'chat' || saved === 'mcp' || saved === 'theme' || saved === 'telemetry') {
      return saved;
    }
  } catch {
    // Ignore localStorage read errors
  }
  return null;
};

export type RightPanelType = 'chat' | 'mcp' | 'theme' | 'telemetry' | null;

interface UIState {
  sidebarWidth: number;
  sidebarCollapsed: boolean;
  isResizing: boolean;
  mobileDrawerOpen: boolean;
  expandedSubmenus: string[];
  commandPaletteOpen: boolean;
  notificationsOpen: boolean;

  // Right Side Panel & Dock State
  activeRightPanel: RightPanelType;
  rightPanelWidth: number;
  isRightResizing: boolean;

  setSidebarWidth: (width: number) => void;
  setIsResizing: (resizing: boolean) => void;
  resetSidebarWidth: () => void;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  toggleMobileDrawer: () => void;
  setMobileDrawerOpen: (open: boolean) => void;

  toggleSubmenu: (id: string) => void;
  setSubmenuExpanded: (id: string, expanded: boolean) => void;

  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;

  setNotificationsOpen: (open: boolean) => void;
  toggleNotifications: () => void;

  // Right Panel actions
  setActiveRightPanel: (panel: RightPanelType) => void;
  toggleRightPanel: (panel: 'chat' | 'mcp' | 'theme' | 'telemetry') => void;
  setRightPanelWidth: (width: number) => void;
  setIsRightResizing: (isResizing: boolean) => void;
  resetRightPanelWidth: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarWidth: getInitialSidebarWidth(),
  sidebarCollapsed: getInitialSidebarCollapsed(),
  isResizing: false,
  mobileDrawerOpen: false,
  expandedSubmenus: ['users-group'],
  commandPaletteOpen: false,
  notificationsOpen: false,

  activeRightPanel: getInitialActiveRightPanel(),
  rightPanelWidth: getInitialRightPanelWidth(),
  isRightResizing: false,

  setSidebarWidth: (width) => {
    const clamped = Math.min(Math.max(width, MIN_SIDEBAR_WIDTH), MAX_SIDEBAR_WIDTH);
    try {
      localStorage.setItem(STORAGE_KEY_WIDTH, String(clamped));
    } catch {
      // Ignore localStorage errors
    }
    set({ sidebarWidth: clamped });
  },

  setIsResizing: (resizing) => set({ isResizing: resizing }),

  resetSidebarWidth: () => {
    try {
      localStorage.setItem(STORAGE_KEY_WIDTH, String(DEFAULT_SIDEBAR_WIDTH));
    } catch {
      // Ignore localStorage errors
    }
    set({ sidebarWidth: DEFAULT_SIDEBAR_WIDTH });
  },

  toggleSidebarCollapsed: () =>
    set((state) => {
      const nextCollapsed = !state.sidebarCollapsed;
      try {
        localStorage.setItem(STORAGE_KEY_COLLAPSED, String(nextCollapsed));
      } catch {
        // Ignore localStorage errors
      }
      return { sidebarCollapsed: nextCollapsed };
    }),

  setSidebarCollapsed: (collapsed) => {
    try {
      localStorage.setItem(STORAGE_KEY_COLLAPSED, String(collapsed));
    } catch {
      // Ignore localStorage errors
    }
    set({ sidebarCollapsed: collapsed });
  },

  toggleMobileDrawer: () =>
    set((state) => ({ mobileDrawerOpen: !state.mobileDrawerOpen })),
  setMobileDrawerOpen: (open) => set({ mobileDrawerOpen: open }),

  toggleSubmenu: (id) =>
    set((state) => ({
      expandedSubmenus: state.expandedSubmenus.includes(id)
        ? state.expandedSubmenus.filter((item) => item !== id)
        : [...state.expandedSubmenus, id],
    })),
  setSubmenuExpanded: (id, expanded) =>
    set((state) => ({
      expandedSubmenus: expanded
        ? Array.from(new Set([...state.expandedSubmenus, id]))
        : state.expandedSubmenus.filter((item) => item !== id),
    })),

  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  setNotificationsOpen: (open) => set({ notificationsOpen: open }),
  toggleNotifications: () =>
    set((state) => ({ notificationsOpen: !state.notificationsOpen })),

  setActiveRightPanel: (panel) => {
    try {
      if (panel) {
        localStorage.setItem(STORAGE_KEY_RIGHT_PANEL, panel);
      } else {
        localStorage.removeItem(STORAGE_KEY_RIGHT_PANEL);
      }
    } catch {
      // Ignore
    }
    set({ activeRightPanel: panel });
  },

  toggleRightPanel: (panel) =>
    set((state) => {
      const nextPanel = state.activeRightPanel === panel ? null : panel;
      try {
        if (nextPanel) {
          localStorage.setItem(STORAGE_KEY_RIGHT_PANEL, nextPanel);
        } else {
          localStorage.removeItem(STORAGE_KEY_RIGHT_PANEL);
        }
      } catch {
        // Ignore
      }
      return { activeRightPanel: nextPanel };
    }),

  setRightPanelWidth: (width) => {
    const clamped = Math.min(Math.max(width, MIN_RIGHT_PANEL_WIDTH), MAX_RIGHT_PANEL_WIDTH);
    try {
      localStorage.setItem(STORAGE_KEY_RIGHT_WIDTH, String(clamped));
    } catch {
      // Ignore
    }
    set({ rightPanelWidth: clamped });
  },

  setIsRightResizing: (isResizing) => set({ isRightResizing: isResizing }),

  resetRightPanelWidth: () => {
    try {
      localStorage.setItem(STORAGE_KEY_RIGHT_WIDTH, String(DEFAULT_RIGHT_PANEL_WIDTH));
    } catch {
      // Ignore
    }
    set({ rightPanelWidth: DEFAULT_RIGHT_PANEL_WIDTH });
  },
}));
