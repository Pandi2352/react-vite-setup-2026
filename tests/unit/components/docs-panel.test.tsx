import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DocsPanel } from '@/features/docs/components/docs-panel';

describe('DocsPanel Component', () => {
  it('renders documentation panel title, search bar, and features', () => {
    render(<DocsPanel />);
    expect(screen.getByText('Platform Documentation & Features')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search features, shortcuts/i)).toBeInTheDocument();
    expect(screen.getByText('60fps Dynamic Resizable Navigation Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Live Telemetry & Core Web Vitals Profiler')).toBeInTheDocument();
  });

  it('filters features when typing into the search bar', () => {
    render(<DocsPanel />);
    const searchInput = screen.getByPlaceholderText(/search features, shortcuts/i);

    fireEvent.change(searchInput, { target: { value: 'Telemetry' } });

    expect(screen.getByText('Live Telemetry & Core Web Vitals Profiler')).toBeInTheDocument();
    expect(screen.queryByText('60fps Dynamic Resizable Navigation Sidebar')).not.toBeInTheDocument();
  });

  it('switches categories and displays keyboard shortcuts', () => {
    render(<DocsPanel />);
    const shortcutsCategoryBtn = screen.getByRole('button', { name: /shortcuts/i });
    fireEvent.click(shortcutsCategoryBtn);

    expect(screen.getByText('Global Keyboard Shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Open Global Command Palette & Quick Search')).toBeInTheDocument();
  });

  it('switches categories and displays architecture tech stack', () => {
    render(<DocsPanel />);
    const techStackCategoryBtn = screen.getByRole('button', { name: /tech stack/i });
    fireEvent.click(techStackCategoryBtn);

    expect(screen.getByText('Architecture & Tech Stack')).toBeInTheDocument();
    expect(screen.getByText('React 19')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });
});
