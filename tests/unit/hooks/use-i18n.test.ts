import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useI18nStore } from '@/features/i18n/store/i18n-store';

describe('useI18nStore Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    act(() => {
      useI18nStore.getState().setLanguage('en');
      useI18nStore.getState().setForceRtl(null);
    });
  });

  it('initializes with English LTR and resolves translation keys', () => {
    const { result } = renderHook(() => useI18nStore());

    expect(result.current.currentLanguage).toBe('en');
    expect(result.current.isRtl).toBe(false);
    expect(result.current.t('nav.dashboard')).toBe('Dashboard');
    expect(result.current.t('common.welcome')).toBe('Welcome back');
  });

  it('switches to Spanish and translates correctly', () => {
    const { result } = renderHook(() => useI18nStore());

    act(() => {
      result.current.setLanguage('es');
    });

    expect(result.current.currentLanguage).toBe('es');
    expect(result.current.isRtl).toBe(false);
    expect(result.current.t('nav.dashboard')).toBe('Panel Principal');
    expect(result.current.t('common.save')).toBe('Guardar Cambios');
  });

  it('automatically sets RTL direction when Arabic is selected', () => {
    const { result } = renderHook(() => useI18nStore());

    act(() => {
      result.current.setLanguage('ar');
    });

    expect(result.current.currentLanguage).toBe('ar');
    expect(result.current.isRtl).toBe(true);
    expect(result.current.t('nav.dashboard')).toBe('لوحة القيادة');
  });

  it('allows manual force RTL override on English', () => {
    const { result } = renderHook(() => useI18nStore());

    act(() => {
      result.current.setLanguage('en');
      result.current.setForceRtl(true);
    });

    expect(result.current.currentLanguage).toBe('en');
    expect(result.current.isRtl).toBe(true);
    expect(result.current.forceRtl).toBe(true);
  });
});
