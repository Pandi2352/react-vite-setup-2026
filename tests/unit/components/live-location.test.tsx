import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LiveLocation } from '@/components/common/location/live-location';

describe('LiveLocation Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders location button with city name and pulsing live pin', () => {
    render(<LiveLocation />);
    const locationBtn = screen.getByRole('button', { name: /live location/i });
    expect(locationBtn).toBeInTheDocument();
  });

  it('opens location and weather detail dialog on click', () => {
    render(<LiveLocation />);
    const locationBtn = screen.getByRole('button', { name: /live location/i });
    fireEvent.click(locationBtn);

    expect(screen.getByText('Live Location & Weather')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /exact gps/i })).toBeInTheDocument();
  });
});
