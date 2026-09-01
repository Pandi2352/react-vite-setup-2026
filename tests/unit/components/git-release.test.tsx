import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GitReleaseBadge } from '@/components/common/git-release';

describe('Git Release Telemetry & Commit Inspector', () => {
  it('renders branch and short commit hash in the badge', () => {
    render(<GitReleaseBadge variant="detailed" />);

    expect(screen.getByText('main')).toBeInTheDocument();
    expect(screen.getByText('74404ba')).toBeInTheDocument();
  });

  it('opens Git release dialog on badge click and displays full commit details', () => {
    render(<GitReleaseBadge variant="detailed" />);

    const badge = screen.getByRole('button');
    fireEvent.click(badge);

    expect(screen.getByText('Git Release Telemetry')).toBeInTheDocument();
    expect(screen.getByText('74404ba42af652d5f0c988a10108f55992cf030d')).toBeInTheDocument();
    expect(screen.getByText('pandi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view commit on github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /repository/i })).toBeInTheDocument();
  });

  it('allows copying full commit hash to clipboard', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });

    render(<GitReleaseBadge variant="detailed" />);

    const badge = screen.getByRole('button');
    fireEvent.click(badge);

    const copyButton = screen.getByRole('button', { name: /copy hash/i });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '74404ba42af652d5f0c988a10108f55992cf030d'
    );
  });
});
