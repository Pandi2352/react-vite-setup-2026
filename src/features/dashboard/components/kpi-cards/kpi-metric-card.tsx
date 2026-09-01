import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KpiMetricCardProps {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  icon: React.ReactNode;
  accentColor: string; // e.g. 'emerald', 'blue', 'purple', 'amber', 'rose', 'cyan', 'fuchsia'
  sparklinePoints?: number[];
  progressBarPct?: number;
}

export const KpiMetricCard: React.FC<KpiMetricCardProps> = ({
  title,
  value,
  change,
  trend,
  description,
  icon,
  accentColor,
  sparklinePoints = [30, 45, 38, 62, 55, 78, 92],
  progressBarPct,
}) => {
  // Sparkline SVG Path Builder
  const min = Math.min(...sparklinePoints);
  const max = Math.max(...sparklinePoints);
  const range = max - min || 1;
  const width = 80;
  const height = 28;

  const points = sparklinePoints
    .map((pt, idx) => {
      const x = (idx / (sparklinePoints.length - 1)) * width;
      const y = height - ((pt - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const getAccentStyles = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          stroke: '#10b981',
          glow: 'group-hover:border-emerald-500/40 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.12)]',
          bar: 'bg-emerald-500',
        };
      case 'blue':
        return {
          iconBg: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          stroke: '#3b82f6',
          glow: 'group-hover:border-blue-500/40 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.12)]',
          bar: 'bg-blue-500',
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
          stroke: '#a855f7',
          glow: 'group-hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.12)]',
          bar: 'bg-purple-500',
        };
      case 'cyan':
        return {
          iconBg: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
          stroke: '#06b6d4',
          glow: 'group-hover:border-cyan-500/40 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.12)]',
          bar: 'bg-cyan-500',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          stroke: '#f59e0b',
          glow: 'group-hover:border-amber-500/40 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.12)]',
          bar: 'bg-amber-500',
        };
      case 'rose':
        return {
          iconBg: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
          stroke: '#f43f5e',
          glow: 'group-hover:border-rose-500/40 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.12)]',
          bar: 'bg-rose-500',
        };
      case 'fuchsia':
        return {
          iconBg: 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20',
          stroke: '#d946ef',
          glow: 'group-hover:border-fuchsia-500/40 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.12)]',
          bar: 'bg-fuchsia-500',
        };
      default:
        return {
          iconBg: 'bg-primary/10 text-primary border-primary/20',
          stroke: 'hsl(var(--primary))',
          glow: 'group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.12)]',
          bar: 'bg-primary',
        };
    }
  };

  const styles = getAccentStyles(accentColor);

  return (
    <div
      className={cn(
        'group relative flex flex-col justify-between p-4 rounded-xl border border-border/80 bg-card/80 backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 shadow-2xs select-none',
        styles.glow
      )}
    >
      {/* Top Row: Title & Icon */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
            {title}
          </span>
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground mt-1 font-mono">
            {value}
          </h3>
        </div>

        <div className={cn('p-2.5 rounded-xl border shadow-2xs shrink-0', styles.iconBg)}>
          {icon}
        </div>
      </div>

      {/* Middle: Sparkline or Progress Bar */}
      <div className="my-2.5 flex items-center justify-between gap-3">
        {progressBarPct !== undefined ? (
          <div className="w-full space-y-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
              <span>Capacity</span>
              <span>{progressBarPct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted/60 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', styles.bar)}
                style={{ width: `${progressBarPct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            {/* Live Sparkline Graph */}
            <svg width={width} height={height} className="overflow-visible shrink-0">
              <polyline
                fill="none"
                stroke={styles.stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
            <span className="text-[10px] font-mono text-muted-foreground tracking-tight">7-Day Trend</span>
          </div>
        )}
      </div>

      {/* Bottom Row: Trend Badge & Description */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40 text-xs">
        <div
          className={cn(
            'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-mono text-[10px] font-bold',
            trend === 'up' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            trend === 'down' && 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
            trend === 'neutral' && 'bg-muted text-muted-foreground'
          )}
        >
          {trend === 'up' && <ArrowUpRight className="h-3 w-3 shrink-0" />}
          {trend === 'down' && <ArrowDownRight className="h-3 w-3 shrink-0" />}
          {trend === 'neutral' && <Minus className="h-3 w-3 shrink-0" />}
          <span>{change}</span>
        </div>

        <span className="text-[10px] text-muted-foreground truncate max-w-[140px]" title={description}>
          {description}
        </span>
      </div>
    </div>
  );
};
