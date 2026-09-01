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
      commitHash: commitHash || 'unknown',
      commitShort: commitShort || 'unknown',
      commitDate: commitDate || new Date().toISOString(),
      commitMsg: commitMsg || 'Release update',
      commitAuthor: commitAuthor || 'unknown',
      branch: branch || 'main',
      repoUrl,
      commitUrl: `${repoUrl}/commit/${commitShort || commitHash || 'main'}`,
    };
  } catch {
    const repoUrl = 'https://github.com/Pandi2352/react-vite-setup-2026';
    return {
      commitHash: 'unknown',
      commitShort: 'unknown',
      commitDate: new Date().toISOString(),
      commitMsg: 'Git info unavailable',
      commitAuthor: 'unknown',
      branch: 'main',
      repoUrl,
      commitUrl: `${repoUrl}/commits/main`,
    };
  }
};

// Bake git info at BUILD time for production
const buildTimeGitInfo = getGitReleaseInfo();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Dev-only plugin: live git info API endpoint so badge always reflects latest commit
    {
      name: 'live-git-info',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use('/__git_info__', (_req, res) => {
          // Read fresh git info on every request — no server restart needed
          const info = getGitReleaseInfo();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.end(JSON.stringify(info));
        });
      },
    },
  ],
  define: {
    // Only used in production build — dev fetches live via API
    __APP_GIT_INFO__: JSON.stringify(buildTimeGitInfo),
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
