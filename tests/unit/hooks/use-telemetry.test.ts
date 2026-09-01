import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTelemetry } from '@/features/telemetry/hooks/use-telemetry';

describe('useTelemetry Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes telemetry with valid baseline web vitals and memory stats', () => {
    const { result } = renderHook(() => useTelemetry(false));

    expect(result.current.fps).toBe(60);
    expect(result.current.fpsStatus).toBe('good');
    expect(result.current.vitals.length).toBe(5);
    expect(result.current.networkWaterfall.length).toBeGreaterThan(0);
    expect(result.current.domStats.totalNodes).toBeGreaterThan(0);
  });

  it('stops frame computation when paused', () => {
    const { result } = renderHook(() => useTelemetry(true));

    expect(result.current.fps).toBe(60);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // History should not record new ticks when paused
    expect(result.current.fpsHistory.length).toBe(0);
  });
});
