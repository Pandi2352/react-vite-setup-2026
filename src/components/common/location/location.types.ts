export interface LocationInfo {
  city: string;
  region: string;
  country: string;
  countryCode: string;
  flag: string;
  latitude: number;
  longitude: number;
  ip?: string;
  isp?: string;
  timezone?: string;
  source: 'ip' | 'gps' | 'fallback';
  temperatureC?: number;
  weatherCondition?: string;
  weatherIcon?: string;
  lastUpdated: string;
}

export const DEFAULT_LOCATION: LocationInfo = {
  city: 'Mumbai',
  region: 'Maharashtra',
  country: 'India',
  countryCode: 'IN',
  flag: '🇮🇳',
  latitude: 19.076,
  longitude: 72.8777,
  timezone: 'Asia/Kolkata',
  source: 'fallback',
  temperatureC: 29,
  weatherCondition: 'Partly Cloudy',
  weatherIcon: '⛅',
  lastUpdated: new Date().toLocaleTimeString(),
};
