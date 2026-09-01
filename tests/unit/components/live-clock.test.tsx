import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { LiveClock } from '@/components/common/clock/live-clock';

describe('LiveClock Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders clock trigger with time and live pulse indicator', () => {
    render(<LiveClock />);
    const clockButton = screen.getByRole('button', { name: /live clock/i });
    expect(clockButton).toBeInTheDocument();
  });

  it('opens timezone picker dialog when clock button is clicked', () => {
    render(<LiveClock />);
    const clockButton = screen.getByRole('button', { name: /live clock/i });
    fireEvent.click(clockButton);

    expect(screen.getByText('Time & World Timezone')).toBeInTheDocument();
    expect(screen.getByText('Display Settings')).toBeInTheDocument();
  });

  it('allows selecting a different timezone region from dialog', () => {
    render(<LiveClock />);
    const clockButton = screen.getByRole('button', { name: /live clock/i });
    fireEvent.click(clockButton);

    // Find and click Tokyo option
    const tokyoOption = screen.getByText('JST - Japan Standard Time');
    fireEvent.click(tokyoOption);

    // Dialog closes after selection
    expect(screen.queryByText('Time & World Timezone')).not.toBeInTheDocument();
  });
});
