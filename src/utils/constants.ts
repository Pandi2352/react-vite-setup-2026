export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'React Vite Setup',
  env: import.meta.env.VITE_APP_ENV || 'development',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
  storagePrefix: 'app_',
};

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  USERS_READ: 'users.read',
  USERS_CREATE: 'users.create',
  USERS_UPDATE: 'users.update',
  USERS_DELETE: 'users.delete',
  REPORTS_READ: 'reports.read',
  SETTINGS_UPDATE: 'settings.update',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
