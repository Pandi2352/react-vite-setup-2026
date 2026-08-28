import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  ThemeMode,
  ResolvedTheme,
  THEME_STORAGE_KEY,
  PALETTE_STORAGE_KEY,
  getSystemTheme,
  applyThemeToDocument,
  applyColorScheme,
} from '@/lib/theme';
import { FONT_STORAGE_KEY, applyFontToDocument } from '@/lib/fonts';

export interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;

  colorPalette: string;
  setColorPalette: (paletteId: string) => void;

  fontId: string;
  setFontId: (fontId: string) => void;

  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  toggleCustomizer: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  // 1. Theme Mode State
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      return stored && ['light', 'dark', 'system'].includes(stored) ? stored : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // 2. Color Palette State (30 Hostinger & Curated Schemes)
  const [colorPalette, setColorPaletteState] = useState<string>(() => {
    if (typeof window === 'undefined') return 'red-black';
    try {
      return localStorage.getItem(PALETTE_STORAGE_KEY) || 'red-black';
    } catch {
      return 'red-black';
    }
  });

  // 3. Font Family State (20 Google Web Fonts)
  const [fontId, setFontIdState] = useState<string>(() => {
    if (typeof window === 'undefined') return 'inter';
    try {
      return localStorage.getItem(FONT_STORAGE_KEY) || 'inter';
    } catch {
      return 'inter';
    }
  });

  // 4. Customizer Drawer Open State
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === 'system' ? getSystemTheme() : theme
  );

  // Set Theme Mode (light / dark / system)
  const setTheme = useCallback((newTheme: ThemeMode) => {
    const res = applyThemeToDocument(newTheme);
    setResolvedTheme(res);
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  // Set Color Palette
  const setColorPalette = useCallback((paletteId: string) => {
    setColorPaletteState(paletteId);
    applyColorScheme(paletteId);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, paletteId);
    } catch (e) {
      console.warn('Failed to save color palette:', e);
    }
  }, []);

  // Set Font Family
  const setFontId = useCallback((newFontId: string) => {
    setFontIdState(newFontId);
    applyFontToDocument(newFontId);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, newFontId);
    } catch (e) {
      console.warn('Failed to save font:', e);
    }
  }, []);

  const toggleCustomizer = useCallback(() => {
    setIsCustomizerOpen((prev) => !prev);
  }, []);

  // Initial effect: Apply custom color palette & font on mount
  useEffect(() => {
    applyColorScheme(colorPalette);
    applyFontToDocument(fontId);
  }, [colorPalette, fontId]);

  // OS Media Query Listener
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const res = applyThemeToDocument('system');
      setResolvedTheme(res);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Cross-tab storage sync
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        const newMode = event.newValue as ThemeMode;
        if (['light', 'dark', 'system'].includes(newMode)) {
          const res = applyThemeToDocument(newMode);
          setResolvedTheme(res);
          setThemeState(newMode);
        }
      }
      if (event.key === PALETTE_STORAGE_KEY && event.newValue) {
        setColorPaletteState(event.newValue);
        applyColorScheme(event.newValue);
      }
      if (event.key === FONT_STORAGE_KEY && event.newValue) {
        setFontIdState(event.newValue);
        applyFontToDocument(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      colorPalette,
      setColorPalette,
      fontId,
      setFontId,
      isCustomizerOpen,
      setIsCustomizerOpen,
      toggleCustomizer,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      colorPalette,
      setColorPalette,
      fontId,
      setFontId,
      isCustomizerOpen,
      setIsCustomizerOpen,
      toggleCustomizer,
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
