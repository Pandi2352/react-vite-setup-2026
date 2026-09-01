import { useState, useEffect, useCallback } from 'react';
import { LocationInfo, DEFAULT_LOCATION } from './location.types';

const STORAGE_KEY = 'forge-ui-user-location';

// Helper to map Open-Meteo weather codes to conditions and icons
function getWeatherInfo(code: number): { condition: string; icon: string } {
  if (code === 0) return { condition: 'Clear Sky', icon: '☀️' };
  if (code <= 3) return { condition: 'Partly Cloudy', icon: '⛅' };
  if (code <= 48) return { condition: 'Foggy', icon: '🌫️' };
  if (code <= 67) return { condition: 'Rain Shower', icon: '🌧️' };
  if (code <= 77) return { condition: 'Snow', icon: '❄️' };
  if (code <= 82) return { condition: 'Heavy Rain', icon: '⛈️' };
  if (code <= 99) return { condition: 'Thunderstorm', icon: '⚡' };
  return { condition: 'Clear', icon: '🌤️' };
}

// Convert country code to emoji flag
function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export function useLiveLocation() {
  const [location, setLocation] = useState<LocationInfo>(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCATION;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_LOCATION, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage parse errors
    }
    return DEFAULT_LOCATION;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch free weather from Open-Meteo (No API key needed)
  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=celsius`
      );
      if (res.ok) {
        const data = await res.json();
        const current = data.current;
        if (current) {
          const { condition, icon } = getWeatherInfo(current.weather_code || 0);
          return {
            temperatureC: Math.round(current.temperature_2m),
            weatherCondition: condition,
            weatherIcon: icon,
          };
        }
      }
    } catch {
      // Ignore weather fetch errors
    }
    return {
      temperatureC: 28,
      weatherCondition: 'Clear Sky',
      weatherIcon: '☀️',
    };
  }, []);

  // Detect location via free IP-API or browser timezone
  const detectIpLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Attempt free ipwho.is service (free, CORS enabled, no API key required)
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const data = await res.json();
        if (data.success !== false && data.city) {
          const lat = data.latitude || DEFAULT_LOCATION.latitude;
          const lon = data.longitude || DEFAULT_LOCATION.longitude;
          const weather = await fetchWeather(lat, lon);

          const newLoc: LocationInfo = {
            city: data.city,
            region: data.region || data.city,
            country: data.country || 'Global',
            countryCode: data.country_code || 'IN',
            flag: data.flag?.emoji || getCountryFlag(data.country_code || 'IN'),
            latitude: lat,
            longitude: lon,
            ip: data.ip,
            isp: data.connection?.isp,
            timezone: data.timezone?.id || Intl.DateTimeFormat().resolvedOptions().timeZone,
            source: 'ip',
            ...weather,
            lastUpdated: new Date().toLocaleTimeString(),
          };

          setLocation(newLoc);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
          setIsLoading(false);
          return;
        }
      }
    } catch {
      // If network fails, use browser timezone city fallback
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
      const cityFromTz = tz.split('/')[1]?.replace(/_/g, ' ') || 'Local City';

      const fallbackLoc: LocationInfo = {
        ...DEFAULT_LOCATION,
        city: cityFromTz,
        timezone: tz,
        source: 'fallback',
        lastUpdated: new Date().toLocaleTimeString(),
      };
      setLocation(fallbackLoc);
    } finally {
      setIsLoading(false);
    }
  }, [fetchWeather]);

  // High-accuracy GPS location via browser navigator.geolocation + free OpenStreetMap reverse geocode
  const detectGpsLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          // Free reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          let city = 'Local Location';
          let state = '';
          let country = 'Local';
          let countryCode = 'IN';

          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            city = addr.city || addr.town || addr.village || addr.suburb || 'Local City';
            state = addr.state || '';
            country = addr.country || 'Local';
            countryCode = addr.country_code?.toUpperCase() || 'IN';
          }

          const weather = await fetchWeather(lat, lon);

          const gpsLoc: LocationInfo = {
            city,
            region: state,
            country,
            countryCode,
            flag: getCountryFlag(countryCode),
            latitude: Number(lat.toFixed(4)),
            longitude: Number(lon.toFixed(4)),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            source: 'gps',
            ...weather,
            lastUpdated: new Date().toLocaleTimeString(),
          };

          setLocation(gpsLoc);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(gpsLoc));
        } catch {
          setError('Failed to fetch city details from coordinates.');
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(`GPS Permission Denied: ${err.message}`);
        setIsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [fetchWeather]);

  // Initial load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      detectIpLocation();
    }
  }, [detectIpLocation]);

  return {
    location,
    isLoading,
    error,
    refreshLocation: detectIpLocation,
    detectGpsLocation,
  };
}
