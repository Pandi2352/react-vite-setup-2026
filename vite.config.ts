import { defineConfig, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
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
 * Vite plugin that writes the current git info to a TypeScript file at startup.
 * The hook imports this file directly — no fetch, no declare const, no "unknown".
 * Works in both dev and production builds.
 */
const gitInfoPlugin = () => {
  const generateFile = () => {
    const info = getGitReleaseInfo();
    const outPath = resolve(__dirname, 'src/components/common/git-release/git-info.generated.ts');

    const content = `// AUTO-GENERATED — do not edit by hand. Updated by vite.config.ts on every dev start / build.
// Last generated: ${new Date().toISOString()}
import type { GitReleaseInfo } from './git-release.types';

const GIT_INFO: GitReleaseInfo = ${JSON.stringify(info, null, 2)};

export default GIT_INFO;
`;
    writeFileSync(outPath, content, 'utf-8');
    console.log(`\n[git-info] ✓ Generated commit info: ${info.branch}@${info.commitShort} (${info.commitDate})\n`);
  };

  return {
    name: 'git-info-generator',
    // Runs synchronously before the server/build starts
    buildStart() {
      generateFile();
    },
    configureServer(server: ViteDevServer) {
      // Also expose a live endpoint so the badge can refresh after new commits
      // without restarting the dev server — just hit the endpoint and re-render
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
