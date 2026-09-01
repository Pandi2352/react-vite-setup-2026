import { GitReleaseInfo } from './git-release.types';

declare const __APP_GIT_INFO__: GitReleaseInfo | undefined;

export const DEFAULT_GIT_INFO: GitReleaseInfo = {
  commitHash: '74404ba42af652d5f0c988a10108f55992cf030d',
  commitShort: '74404ba',
  commitDate: '2026-09-01 15:04:47 +0530',
  commitMsg: 'feat: add documentation features panel with tech stack and keyboard shortcuts support',
  commitAuthor: 'pandi',
  branch: 'main',
  repoUrl: 'https://github.com/Pandi2352/react-vite-setup-2026',
  commitUrl: 'https://github.com/Pandi2352/react-vite-setup-2026/commit/74404ba',
};

export const useGitRelease = (): GitReleaseInfo => {
  if (typeof __APP_GIT_INFO__ !== 'undefined' && __APP_GIT_INFO__) {
    return __APP_GIT_INFO__;
  }
  return DEFAULT_GIT_INFO;
};
