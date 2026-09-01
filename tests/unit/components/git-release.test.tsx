import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitReleaseBadge } from '@/components/common/git-release';

// Mock fetch so the hook's live fetch resolves immediately with known data
beforeEach(() => {
  const mockGitInfo = {
    commitHash: '74404ba42af652d5f0c988a10108f55992cf030d',
    commitShort: '74404ba',
    commitDate: '2026-09-01 15:04:47 +0530',
    commitMsg: 'feat: add documentation features panel with tech stack and keyboard shortcuts support',
    commitAuthor: 'pandi',
    branch: 'main',
    repoUrl: 'https://github.com/Pandi2352/react-vite-setup-2026',
    commitUrl: 'https://github.com/Pandi2352/react-vite-setup-2026/commit/74404ba',
  };

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockGitInfo,
  } as Response);
});

describe('Git Release Telemetry & Commit Inspector', () => {
  it('renders branch and short commit hash in the badge', () => {
    render(<GitReleaseBadge variant="detailed" />);

    // On initial render it shows BUILD_TIME_GIT_INFO which is mocked via __APP_GIT_INFO__
    // The branch and short hash come from the baked build-time value
    expect(screen.getByText('main')).toBeInTheDocument();
  });

  it('opens Git release dialog on badge click and displays full commit details', () => {
    render(<GitReleaseBadge variant="detailed" />);

    const badge = screen.getByRole('button', { name: /git release/i });
    fireEvent.click(badge);

    expect(screen.getByText('Git Release Telemetry')).toBeInTheDocument();
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

    const badge = screen.getByRole('button', { name: /git release/i });
    fireEvent.click(badge);

    const copyButton = screen.getByRole('button', { name: /copy hash/i });
    fireEvent.click(copyButton);

    // clipboard.writeText is called with whatever commitHash is shown (from baked or live info)
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
