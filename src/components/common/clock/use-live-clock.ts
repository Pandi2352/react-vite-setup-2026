import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ClockPreferences,
  DEFAULT_CLOCK_PREFERENCES,
  TIMEZONE_OPTIONS,
  TimezoneOption,
} from './clock.types';

const STORAGE_KEY = 'forge-ui-clock-prefs';

export function useLiveClock() {
  const [preferences, setPreferences] = useState<ClockPreferences>(() => {
    if (typeof window === 'undefined') return DEFAULT_CLOCK_PREFERENCES;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_CLOCK_PREFERENCES, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore JSON parse errors
    }
    return DEFAULT_CLOCK_PREFERENCES;
  });

  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  // Tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update preferences & save
  const updatePreferences = useCallback((updates: Partial<ClockPreferences>) => {
    setPreferences((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  // Find active timezone object
  const activeTimezoneOption = useMemo<TimezoneOption>(() => {
    const found = TIMEZONE_OPTIONS.find((tz) => tz.ianaZone === preferences.timezone);
    return found || TIMEZONE_OPTIONS[0];
  }, [preferences.timezone]);

  // Formatted Time (e.g., "01:26:45 PM" or "13:26:45")
  const formattedTime = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: preferences.showSeconds ? '2-digit' : undefined,
      hour12: preferences.hour12,
    };

    if (preferences.timezone !== 'local') {
      options.timeZone = preferences.timezone;
    }

    try {
      return new Intl.DateTimeFormat('en-US', options).format(currentTime);
    } catch {
      return currentTime.toLocaleTimeString();
    }
  }, [currentTime, preferences.timezone, preferences.hour12, preferences.showSeconds]);

  // Formatted Date (e.g., "Tue, Sep 1, 2026")
  const formattedDate = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };

    if (preferences.timezone !== 'local') {
      options.timeZone = preferences.timezone;
    }

    try {
      return new Intl.DateTimeFormat('en-US', options).format(currentTime);
    } catch {
      return currentTime.toLocaleDateString();
    }
  }, [currentTime, preferences.timezone]);

  // Short Date (e.g., "Sep 1")
  const formattedDateShort = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };

    if (preferences.timezone !== 'local') {
      options.timeZone = preferences.timezone;
    }

    try {
      return new Intl.DateTimeFormat('en-US', options).format(currentTime);
    } catch {
      return currentTime.toLocaleDateString();
    }
  }, [currentTime, preferences.timezone]);

  // Timezone code (e.g., "IST", "EST", "UTC")
  const timezoneCode = useMemo(() => {
    if (preferences.timezone === 'local') {
      try {
        const str = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).format(currentTime);
        const parts = str.split(' ');
        return parts[parts.length - 1] || 'Local';
      } catch {
        return 'Local';
      }
    }
    return activeTimezoneOption.flag + ' ' + activeTimezoneOption.offsetLabel;
  }, [preferences.timezone, currentTime, activeTimezoneOption]);

  return {
    currentTime,
    formattedTime,
    formattedDate,
    formattedDateShort,
    timezoneCode,
    preferences,
    activeTimezoneOption,
    setTimezone: (tz: string) => updatePreferences({ timezone: tz }),
    setHour12: (h12: boolean) => updatePreferences({ hour12: h12 }),
    setShowSeconds: (sec: boolean) => updatePreferences({ showSeconds: sec }),
    setShowDate: (date: boolean) => updatePreferences({ showDate: date }),
    updatePreferences,
  };
}
