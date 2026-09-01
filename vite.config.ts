import { defineConfig, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath as fu } from 'url';

const __dirname = dirname(fu(import.meta.url));

const REPO_URL = 'https://github.com/Pandi2352/react-vite-setup-2026';

const getGitReleaseInfo = () => {
  try {
    const run = (cmd: string) =>
      execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();

    const commitHash   = run('git rev-parse HEAD');
    const commitShort  = run('git rev-parse --short HEAD');
    const commitDate   = run('git log -1 --format=%cd --date=format:"%Y-%m-%d %H:%M:%S %z"');
    const commitMsg    = run('git log -1 --format=%s');
    const commitAuthor = run('git log -1 --format=%an');
    const branch       = run('git rev-parse --abbrev-ref HEAD');

    return {
      commitHash:   commitHash   || 'HEAD',
      commitShort:  commitShort  || 'HEAD',
      commitDate:   commitDate   || new Date().toISOString(),
      commitMsg:    commitMsg    || 'Latest commit',
      commitAuthor: commitAuthor || 'pandi',
      branch:       branch       || 'main',
      repoUrl:      REPO_URL,
      commitUrl:    `${REPO_URL}/commit/${commitShort || commitHash || 'main'}`,
    };
  } catch {
    // If git isn't available, return a meaningful last-known fallback
    return {
      commitHash:   'HEAD',
      commitShort:  'HEAD',
      commitDate:   new Date().toISOString(),
      commitMsg:    'Git unavailable – run inside a git repo',
      commitAuthor: 'pandi',
      branch:       'main',
      repoUrl:      REPO_URL,
      commitUrl:    `${REPO_URL}/commits/main`,
    };
  }
};

/**
 * Vite plugin that calls scripts/generate-git-info.mjs at startup.
 * - `config()` fires for BOTH `vite` (dev) and `vite build` (production).
 * - `prebuild` npm script also calls the same script so tsc gets the file first.
 * - Exposes `/__git_info__` endpoint in dev for live badge refresh.
 */
const gitInfoPlugin = () => {
  return {
    name: 'git-info-generator',
    // Runs synchronously for both dev server start AND production build
    config() {
      const scriptPath = resolve(__dirname, 'scripts/generate-git-info.mjs');
      try {
        execSync(`node "${scriptPath}"`, {
          stdio: 'inherit',
          cwd: __dirname,
        });
      } catch {
        // If script fails, warn but don't crash the dev server
        console.warn('[git-info] ⚠ Could not generate git-info.generated.ts');
      }
    },
    configureServer(server: ViteDevServer) {
      // Live endpoint — fetches fresh git info on every request
      // Badge auto-calls this on mount so new commits appear after page refresh
      server.middlewares.use('/__git_info__', (_req, res) => {
        const info = getGitReleaseInfo();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.end(JSON.stringify(info));
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), gitInfoPlugin()],
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
