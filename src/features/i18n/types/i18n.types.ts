export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar' | 'hi' | 'zh';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  coveragePct: number;
}

export interface I18nPreferences {
  language: LanguageCode;
  forceRtl: boolean | null; // null = follow language default, true/false = override
}

export type TranslationDictionary = Record<string, string>;

export interface I18nState {
  currentLanguage: LanguageCode;
  isRtl: boolean;
  forceRtl: boolean | null;
  t: (key: string, fallback?: string) => string;
  setLanguage: (code: LanguageCode) => void;
  setForceRtl: (override: boolean | null) => void;
}
