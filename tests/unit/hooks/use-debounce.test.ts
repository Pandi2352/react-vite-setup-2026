import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDebounce } from '@/hooks/use-debounce';

describe('useDebounce Hook', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should update debounced value after delay', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 300), {
      initialProps: { val: 'first' },
    });

    rerender({ val: 'second' });
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('second');
    vi.useRealTimers();
  });
});
