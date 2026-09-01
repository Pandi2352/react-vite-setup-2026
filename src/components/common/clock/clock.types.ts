export interface TimezoneOption {
  id: string;
  label: string;
  city: string;
  country: string;
  ianaZone: string; // e.g. 'Asia/Kolkata', 'America/New_York', 'UTC'
  offsetLabel: string; // e.g. 'UTC+5:30'
  flag: string; // Flag emoji
}

export interface ClockPreferences {
  timezone: string; // IANA timezone or 'local'
  hour12: boolean; // true = 12h AM/PM, false = 24h military
  showSeconds: boolean;
  showDate: boolean;
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  {
    id: 'local',
    label: 'Local System Time',
    city: 'Current Device',
    country: 'Local',
    ianaZone: 'local',
    offsetLabel: 'Local',
    flag: '🌐',
  },
  {
    id: 'utc',
    label: 'UTC (Universal Coordinated Time)',
    city: 'Greenwich',
    country: 'Universal',
    ianaZone: 'UTC',
    offsetLabel: 'UTC+0',
    flag: '⏱️',
  },
  {
    id: 'mumbai',
    label: 'IST - India Standard Time',
    city: 'Mumbai / Delhi',
    country: 'India',
    ianaZone: 'Asia/Kolkata',
    offsetLabel: 'UTC+5:30',
    flag: '🇮🇳',
  },
  {
    id: 'newyork',
    label: 'EST / EDT - US Eastern Time',
    city: 'New York',
    country: 'United States',
    ianaZone: 'America/New_York',
    offsetLabel: 'UTC-5:00',
    flag: '🇺🇸',
  },
  {
    id: 'london',
    label: 'GMT / BST - British Time',
    city: 'London',
    country: 'United Kingdom',
    ianaZone: 'Europe/London',
    offsetLabel: 'UTC+0:00',
    flag: '🇬🇧',
  },
  {
    id: 'paris',
    label: 'CET / CEST - Central Europe',
    city: 'Paris / Berlin',
    country: 'France / Germany',
    ianaZone: 'Europe/Paris',
    offsetLabel: 'UTC+1:00',
    flag: '🇫🇷',
  },
  {
    id: 'dubai',
    label: 'GST - Gulf Standard Time',
    city: 'Dubai',
    country: 'United Arab Emirates',
    ianaZone: 'Asia/Dubai',
    offsetLabel: 'UTC+4:00',
    flag: '🇦🇪',
  },
  {
    id: 'singapore',
    label: 'SGT - Singapore Standard Time',
    city: 'Singapore',
    country: 'Singapore',
    ianaZone: 'Asia/Singapore',
    offsetLabel: 'UTC+8:00',
    flag: '🇸🇬',
  },
  {
    id: 'tokyo',
    label: 'JST - Japan Standard Time',
    city: 'Tokyo',
    country: 'Japan',
    ianaZone: 'Asia/Tokyo',
    offsetLabel: 'UTC+9:00',
    flag: '🇯🇵',
  },
  {
    id: 'sydney',
    label: 'AEST / AEDT - Australia Eastern',
    city: 'Sydney / Melbourne',
    country: 'Australia',
    ianaZone: 'Australia/Sydney',
    offsetLabel: 'UTC+11:00',
    flag: '🇦🇺',
  },
];

export const DEFAULT_CLOCK_PREFERENCES: ClockPreferences = {
  timezone: 'local',
  hour12: true,
  showSeconds: true,
  showDate: true,
};
