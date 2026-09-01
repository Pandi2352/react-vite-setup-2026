import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useLiveClock } from '@/components/common/clock/use-live-clock';

describe('useLiveClock Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with default preferences and formatted live time', () => {
    const { result } = renderHook(() => useLiveClock());

    expect(result.current.formattedTime).toBeTruthy();
    expect(result.current.formattedDate).toBeTruthy();
    expect(result.current.preferences.timezone).toBe('local');
    expect(result.current.preferences.hour12).toBe(true);
    expect(result.current.preferences.showSeconds).toBe(true);
  });

  it('updates timezone to another IANA zone correctly', () => {
    const { result } = renderHook(() => useLiveClock());

    act(() => {
      result.current.setTimezone('America/New_York');
    });

    expect(result.current.preferences.timezone).toBe('America/New_York');
    expect(result.current.activeTimezoneOption.city).toBe('New York');
    expect(result.current.timezoneCode).toContain('UTC-5:00');
  });

  it('toggles 12-hour and 24-hour mode', () => {
    const { result } = renderHook(() => useLiveClock());

    act(() => {
      result.current.setHour12(false);
    });

    expect(result.current.preferences.hour12).toBe(false);
  });

  it('toggles seconds visibility', () => {
    const { result } = renderHook(() => useLiveClock());

    act(() => {
      result.current.setShowSeconds(false);
    });

    expect(result.current.preferences.showSeconds).toBe(false);
  });
});
