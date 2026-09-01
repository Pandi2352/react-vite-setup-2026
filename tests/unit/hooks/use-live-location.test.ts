import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLiveLocation } from '@/components/common/location/use-live-location';

describe('useLiveLocation Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default location and weather parameters', () => {
    const { result } = renderHook(() => useLiveLocation());

    expect(result.current.location.city).toBeTruthy();
    expect(result.current.location.country).toBeTruthy();
    expect(result.current.location.latitude).toBeDefined();
    expect(result.current.location.longitude).toBeDefined();
  });

  it('provides callable refreshLocation and detectGpsLocation functions', () => {
    const { result } = renderHook(() => useLiveLocation());

    expect(typeof result.current.refreshLocation).toBe('function');
    expect(typeof result.current.detectGpsLocation).toBe('function');
  });
});
