import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';
import { execSync } from 'child_process';

const getGitReleaseInfo = () => {
  try {
    const commitHash = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const commitShort = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const commitDate = execSync('git log -1 --format=%cd --date=iso', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const commitMsg = execSync('git log -1 --format=%s', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const commitAuthor = execSync('git log -1 --format=%an', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
    const repoUrl = 'https://github.com/Pandi2352/react-vite-setup-2026';

    return {
      commitHash: commitHash || '74404ba42af652d5f0c988a10108f55992cf030d',
      commitShort: commitShort || '74404ba',
      commitDate: commitDate || new Date().toISOString(),
      commitMsg: commitMsg || 'Release update',
      commitAuthor: commitAuthor || 'pandi',
      branch: branch || 'main',
      repoUrl,
      commitUrl: `${repoUrl}/commit/${commitHash || '74404ba'}`,
    };
  } catch {
    const repoUrl = 'https://github.com/Pandi2352/react-vite-setup-2026';
    const commitHash = '74404ba42af652d5f0c988a10108f55992cf030d';
    return {
      commitHash,
      commitShort: '74404ba',
      commitDate: '2026-09-01 15:04:47 +0530',
      commitMsg: 'feat: add documentation features panel with tech stack and keyboard shortcuts support',
      commitAuthor: 'pandi',
      branch: 'main',
      repoUrl,
      commitUrl: `${repoUrl}/commit/${commitHash}`,
    };
  }
};

const gitInfo = getGitReleaseInfo();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __APP_GIT_INFO__: JSON.stringify(gitInfo),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    include: ['recharts', 'lucide-react', 'zustand', 'clsx', 'tailwind-merge'],
  },
});
