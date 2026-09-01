import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { I18nPanel } from '@/features/i18n/components/i18n-panel';
import { useI18nStore } from '@/features/i18n/store/i18n-store';

describe('I18nPanel Component', () => {
  beforeEach(() => {
    localStorage.clear();
    act(() => {
      useI18nStore.getState().setLanguage('en');
      useI18nStore.getState().setForceRtl(null);
    });
  });

  it('renders i18n panel header, tabs, and live translated preview', () => {
    render(<I18nPanel />);
    expect(screen.getByText('i18n & RTL Layout Suite')).toBeInTheDocument();
    expect(screen.getByText('Live Translated Preview')).toBeInTheDocument();
    expect(screen.getByText('Global Languages (8 Locales)')).toBeInTheDocument();
  });

  it('switches to German when German language card is clicked', () => {
    render(<I18nPanel />);
    const germanOption = screen.getByText('Deutsch');
    fireEvent.click(germanOption);

    expect(useI18nStore.getState().currentLanguage).toBe('de');
  });

  it('switches tabs to RTL Mirror and displays direction controls', () => {
    render(<I18nPanel />);
    const rtlTab = screen.getByRole('button', { name: /rtl mirror/i });
    fireEvent.click(rtlTab);

    expect(screen.getByText('RTL Document Mirroring')).toBeInTheDocument();
    expect(screen.getByText('Force RTL')).toBeInTheDocument();
  });
});
