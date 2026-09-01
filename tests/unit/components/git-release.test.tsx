import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitReleaseBadge } from '@/components/common/git-release';

// Mock the generated git info file so tests don't depend on the local git state
vi.mock('@/components/common/git-release/git-info.generated', () => ({
  default: {
    commitHash: '1b09cc0c424ed140cfadd1d1b099042ad30491ca',
    commitShort: '1b09cc0',
    commitDate: '2026-09-01 16:22:01 +0530',
    commitMsg: 'test: add unit tests for GitReleaseBadge',
    commitAuthor: 'pandi',
    branch: 'main',
    repoUrl: 'https://github.com/Pandi2352/react-vite-setup-2026',
    commitUrl: 'https://github.com/Pandi2352/react-vite-setup-2026/commit/1b09cc0',
  },
}));

// Mock fetch for the optional live-refresh call the hook makes in dev mode
beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false, // return not-ok so hook keeps the generated file's data
  } as Response);
});

describe('Git Release Telemetry & Commit Inspector', () => {
  it('renders branch name and short commit hash in the badge', () => {
    render(<GitReleaseBadge variant="detailed" />);
    expect(screen.getByText('main')).toBeInTheDocument();
    expect(screen.getByText('1b09cc0')).toBeInTheDocument();
  });

  it('opens Git release dialog on badge click and displays commit details', () => {
    render(<GitReleaseBadge variant="detailed" />);

    const badge = screen.getByRole('button', { name: /git release/i });
    fireEvent.click(badge);

    expect(screen.getByText('Git Release Telemetry')).toBeInTheDocument();
    expect(screen.getByText('1b09cc0c424ed140cfadd1d1b099042ad30491ca')).toBeInTheDocument();
    expect(screen.getByText('pandi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view commit on github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /repository/i })).toBeInTheDocument();
  });

  it('allows copying full commit hash to clipboard', () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn() },
    });

    render(<GitReleaseBadge variant="detailed" />);
    fireEvent.click(screen.getByRole('button', { name: /git release/i }));
    fireEvent.click(screen.getByRole('button', { name: /copy hash/i }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '1b09cc0c424ed140cfadd1d1b099042ad30491ca'
    );
  });
});
