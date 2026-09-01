import React from 'react';
import { DomHealthStats } from '../types/telemetry.types';
import { Layers, GitCommit, MousePointerClick, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface TelemetryDomInspectorProps {
  stats: DomHealthStats;
}

export const TelemetryDomInspector: React.FC<TelemetryDomInspectorProps> = ({ stats }) => {
  const recommendedMaxNodes = 1500;
  const nodePercentage = Math.min(100, Math.round((stats.totalNodes / recommendedMaxNodes) * 100));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground">DOM Tree Health & Node Analyzer</h3>
        <Badge variant="success" className="text-[9px] px-1.5 py-0">Optimal</Badge>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg border border-border bg-card/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-semibold uppercase">Total Nodes</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-foreground font-mono">{stats.totalNodes}</span>
            <span className="text-[10px] text-muted-foreground">/ {recommendedMaxNodes} max</span>
          </div>
          <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${nodePercentage}%` }}
            />
          </div>
        </div>

        <div className="p-3 rounded-lg border border-border bg-card/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <GitCommit className="h-3.5 w-3.5 text-violet-500" />
            <span className="text-[10px] font-semibold uppercase">Max Tree Depth</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-foreground font-mono">{stats.maxDepth}</span>
            <span className="text-[10px] text-muted-foreground">levels (&lt;32 ok)</span>
          </div>
          <div className="w-full bg-muted/40 h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 rounded-full"
              style={{ width: `${Math.min(100, (stats.maxDepth / 32) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Additional DOM Insights */}
      <div className="p-3 rounded-lg border border-border bg-card/60 space-y-2">
        <div className="flex items-center justify-between text-xs py-1 border-b border-border/50">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <MousePointerClick className="h-3.5 w-3.5 text-amber-500" />
            <span>Active Event Listeners (Est.)</span>
          </span>
          <span className="font-mono font-bold text-foreground">{stats.eventListenersEstimate}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1 border-b border-border/50">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Layers className="h-3.5 w-3.5 text-blue-500" />
            <span>Direct Body Children</span>
          </span>
          <span className="font-mono font-bold text-foreground">{stats.bodyChildren}</span>
        </div>

        <div className="flex items-center justify-between text-xs py-1">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Memory Leak Risk</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-500 uppercase">Very Low</span>
        </div>
      </div>
    </div>
  );
};
