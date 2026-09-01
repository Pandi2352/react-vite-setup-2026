import { useState, useEffect } from 'react';
import { GitReleaseInfo } from './git-release.types';

declare const __APP_GIT_INFO__: GitReleaseInfo | undefined;

// Baked at build time — used in production or as initial SSR value
const BUILD_TIME_GIT_INFO: GitReleaseInfo =
  typeof __APP_GIT_INFO__ !== 'undefined' && __APP_GIT_INFO__
    ? __APP_GIT_INFO__
    : {
        commitHash: 'unknown',
        commitShort: 'unknown',
        commitDate: new Date().toISOString(),
        commitMsg: 'Git info unavailable',
        commitAuthor: 'unknown',
        branch: 'main',
        repoUrl: 'https://github.com/Pandi2352/react-vite-setup-2026',
        commitUrl: 'https://github.com/Pandi2352/react-vite-setup-2026/commits/main',
      };

/**
 * In development, fetches live git info from the Vite dev server middleware
 * (`/__git_info__`) on every mount — so the badge always shows the *latest*
 * commit even if you committed after starting `npm run dev`.
 *
 * In production, returns the info baked at build time.
 */
export const useGitRelease = (): GitReleaseInfo => {
  const [gitInfo, setGitInfo] = useState<GitReleaseInfo>(BUILD_TIME_GIT_INFO);

  useEffect(() => {
    // Only fetch live in dev — production always uses baked build-time info
    if (import.meta.env.MODE !== 'development') return;

    let cancelled = false;

    const fetchLive = async () => {
      try {
        const res = await fetch('/__git_info__', {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (!res.ok) return;
        const data: GitReleaseInfo = await res.json();
        if (!cancelled) {
          setGitInfo(data);
        }
      } catch {
        // Silently fall back to baked info if fetch fails
      }
    };

    fetchLive();

    return () => {
      cancelled = true;
    };
  }, []);

  return gitInfo;
};
