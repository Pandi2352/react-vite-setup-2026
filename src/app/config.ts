export const envConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'ForgeUI',
  environment: import.meta.env.VITE_APP_ENV || 'development',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
};
