import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, GitBranch, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useGitRelease } from '@/components/common/git-release';

export const DocsTechStackCard: React.FC = () => {
  const gitInfo = useGitRelease();

  const stackItems = [
    { name: 'React 19', role: 'Concurrent UI Framework', version: 'v19.0.0' },
    { name: 'Vite', role: 'Next-Gen Build Engine', version: 'v6.4.3' },
    { name: 'TypeScript', role: 'Type-Safe Architecture', version: 'v5.7.0' },
    { name: 'Tailwind CSS', role: 'Design System & Utility CSS', version: 'v4.0' },
    { name: 'Recharts', role: 'Animated Charts Suite', version: 'v2.15' },
    { name: 'Zustand', role: 'Predictable State Management', version: 'v5.0' },
    { name: 'Vitest', role: '100% Unit Test Suite (46 Tests)', version: 'v3.2' },
    { name: 'Lucide Icons', role: 'Clean Vector Iconography', version: 'v0.470' },
  ];

  return (
    <div className="space-y-3 p-3.5 rounded-xl border border-border bg-card/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">Architecture & Tech Stack</h3>
            <p className="text-[10px] text-muted-foreground">High-performance enterprise foundation</p>
          </div>
        </div>

        <Badge variant="success" className="text-[9px] font-mono px-1.5 py-0">
          <ShieldCheck className="h-3 w-3 mr-1" /> 100% Passing Tests
        </Badge>
      </div>

      {/* Live Git Release Status Banner */}
      <div className="p-2.5 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <GitBranch className="h-4 w-4 text-emerald-500 shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="font-bold text-foreground">{gitInfo.branch}</span>
              <span className="text-muted-foreground">:</span>
              <span className="font-bold text-primary">{gitInfo.commitShort}</span>
              <span className="text-muted-foreground text-[10px]">({gitInfo.commitDate.split(' ')[0]})</span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate">{gitInfo.commitMsg}</p>
          </div>
        </div>

        <a
          href={gitInfo.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-card border border-border hover:border-primary/40 text-foreground transition-colors shrink-0"
        >
          <span>Repo</span>
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        {stackItems.map((item) => (
          <div
            key={item.name}
            className="p-2 rounded-lg bg-muted/20 border border-border/50 space-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                {item.name}
              </span>
              <span className="text-[9px] font-mono text-primary font-semibold">{item.version}</span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate">{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
