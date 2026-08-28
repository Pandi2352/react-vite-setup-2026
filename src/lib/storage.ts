import { APP_CONFIG } from '@/utils/constants';

export const storage = {
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(APP_CONFIG.storagePrefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(APP_CONFIG.storagePrefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(APP_CONFIG.storagePrefix + key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear(): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(APP_CONFIG.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};
