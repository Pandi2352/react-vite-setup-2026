import { create } from 'zustand';
import { ThemeMode } from '@/types/common.types';
import { storage } from '@/lib/storage';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const getInitialTheme = (): ThemeMode => {
  const storedTheme = storage.get<ThemeMode>('theme_mode');
  if (storedTheme) return storedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeToDOM = (theme: ThemeMode) => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};

const initialTheme = getInitialTheme();
applyThemeToDOM(initialTheme);

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  setTheme: (theme: ThemeMode) => {
    storage.set('theme_mode', theme);
    applyThemeToDOM(theme);
    set({ theme });
  },
}));
