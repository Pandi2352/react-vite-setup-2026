import { create } from 'zustand';
import { LanguageCode } from '../types/i18n.types';
import { SUPPORTED_LANGUAGES, DICTIONARIES } from '../locales/dictionaries';

const STORAGE_KEY_LANG = 'forge-ui-lang';
const STORAGE_KEY_FORCE_RTL = 'forge-ui-force-rtl';

const getInitialLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LANG) as LanguageCode;
    if (saved && DICTIONARIES[saved]) return saved;
  } catch {
    // Ignore storage errors
  }
  return 'en';
};

const getInitialForceRtl = (): boolean | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FORCE_RTL);
    if (saved === 'true') return true;
    if (saved === 'false') return false;
  } catch {
    // Ignore storage errors
  }
  return null;
};

// Helper to update document HTML lang and dir attributes
const syncDocumentDirection = (lang: LanguageCode, forceRtl: boolean | null) => {
  if (typeof document === 'undefined') return;
  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const isRtl = forceRtl !== null ? forceRtl : langConfig?.direction === 'rtl';

  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
};

interface I18nStoreState {
  currentLanguage: LanguageCode;
  forceRtl: boolean | null;
  isRtl: boolean;
  t: (key: string, fallback?: string) => string;
  setLanguage: (lang: LanguageCode) => void;
  setForceRtl: (override: boolean | null) => void;
}

export const useI18nStore = create<I18nStoreState>((set, get) => {
  const initialLang = getInitialLanguage();
  const initialForceRtl = getInitialForceRtl();
  const initialLangOption = SUPPORTED_LANGUAGES.find((l) => l.code === initialLang);
  const initialIsRtl = initialForceRtl !== null ? initialForceRtl : initialLangOption?.direction === 'rtl';

  // Apply attributes immediately on init
  syncDocumentDirection(initialLang, initialForceRtl);

  return {
    currentLanguage: initialLang,
    forceRtl: initialForceRtl,
    isRtl: initialIsRtl,

    t: (key: string, fallback?: string) => {
      const { currentLanguage } = get();
      const dict = DICTIONARIES[currentLanguage] || DICTIONARIES.en;
      return dict[key] || DICTIONARIES.en[key] || fallback || key;
    },

    setLanguage: (lang: LanguageCode) => {
      const { forceRtl } = get();
      const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
      const isRtl = forceRtl !== null ? forceRtl : langConfig?.direction === 'rtl';

      try {
        localStorage.setItem(STORAGE_KEY_LANG, lang);
      } catch {
        // Ignore storage errors
      }

      syncDocumentDirection(lang, forceRtl);

      set({
        currentLanguage: lang,
        isRtl,
      });
    },

    setForceRtl: (override: boolean | null) => {
      const { currentLanguage } = get();
      const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);
      const isRtl = override !== null ? override : langConfig?.direction === 'rtl';

      try {
        if (override === null) {
          localStorage.removeItem(STORAGE_KEY_FORCE_RTL);
        } else {
          localStorage.setItem(STORAGE_KEY_FORCE_RTL, String(override));
        }
      } catch {
        // Ignore storage errors
      }

      syncDocumentDirection(currentLanguage, override);

      set({
        forceRtl: override,
        isRtl,
      });
    },
  };
});
