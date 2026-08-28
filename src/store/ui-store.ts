import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  mobileDrawerOpen: boolean;
  expandedSubmenus: string[];
  commandPaletteOpen: boolean;
  notificationsOpen: boolean;

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
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  mobileDrawerOpen: false,
  expandedSubmenus: ['users-group'],
  commandPaletteOpen: false,
  notificationsOpen: false,

  toggleSidebarCollapsed: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

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
}));
