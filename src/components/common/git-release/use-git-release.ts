/**
 * useGitRelease hook
 *
 * Reads from `git-info.generated.ts` which is written by the Vite plugin
 * in vite.config.ts at the start of every `npm run dev` or `npm run build`.
 *
 * This means the badge always shows the commit that was HEAD when the
 * dev server last started (or when the production build was made).
 *
 * After you commit and want the badge to update WITHOUT restarting the dev
 * server, the Vite plugin also exposes `/__git_info__` — call refreshGitInfo()
 * from anywhere to pick up the latest commit on the fly.
 */
import { useState, useCallback, useEffect } from 'react';
import { GitReleaseInfo } from './git-release.types';
// Static import — always populated by the Vite plugin, never "unknown"
import GIT_INFO from './git-info.generated';

export { GIT_INFO as DEFAULT_GIT_INFO };

export const useGitRelease = (): GitReleaseInfo & { refresh: () => Promise<void>; isRefreshing: boolean } => {
  const [gitInfo, setGitInfo] = useState<GitReleaseInfo>(GIT_INFO);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    // Only try the live endpoint in dev mode
    if (import.meta.env.MODE !== 'development') return;

    setIsRefreshing(true);
    try {
      const res = await fetch('/__git_info__', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const data: GitReleaseInfo = await res.json();
        // Only update if we got real data (not "unknown")
        if (data.commitHash && data.commitHash !== 'HEAD') {
          setGitInfo(data);
        }
      }
    } catch {
      // Silently keep showing last known good data
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Auto-refresh once on mount in dev (picks up commits made since last server start)
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      refresh();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...gitInfo, refresh, isRefreshing };
};
