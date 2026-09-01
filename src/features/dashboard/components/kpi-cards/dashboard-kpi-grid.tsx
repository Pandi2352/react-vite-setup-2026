import React, { useState } from 'react';
import { KpiMetricCard, KpiMetricCardProps } from './kpi-metric-card';
import {
  Users,
  Zap,
  DollarSign,
  ShieldCheck,
  Globe,
  Gauge,
  HardDrive,
  GitBranch,
  Bot,
  Activity,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const DashboardKpiGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'financial' | 'infra' | 'security'>('all');

  const kpis: (KpiMetricCardProps & { category: 'financial' | 'infra' | 'security' })[] = [
    {
      id: 'active-users',
      category: 'financial',
      title: 'Total Active Users',
      value: '148,290',
      change: '+12.4%',
      trend: 'up',
      description: 'vs. last month',
      icon: <Users className="h-5 w-5" />,
      accentColor: 'emerald',
      sparklinePoints: [110, 118, 125, 132, 139, 142, 148],
    },
    {
      id: 'api-throughput',
      category: 'infra',
      title: 'API Throughput',
      value: '8.42M',
      change: '+24.1%',
      trend: 'up',
      description: 'req / 24h peak',
      icon: <Zap className="h-5 w-5" />,
      accentColor: 'purple',
      sparklinePoints: [5.2, 5.8, 6.4, 7.1, 7.8, 8.1, 8.42],
    },
    {
      id: 'mrr-revenue',
      category: 'financial',
      title: 'Monthly Recurring (MRR)',
      value: '$128,450',
      change: '+18.2%',
      trend: 'up',
      description: 'Annualized $1.54M',
      icon: <DollarSign className="h-5 w-5" />,
      accentColor: 'cyan',
      sparklinePoints: [94, 98, 105, 112, 119, 123, 128],
    },
    {
      id: 'security-score',
      category: 'security',
      title: 'Security Health Index',
      value: '99.8%',
      change: 'Optimal',
      trend: 'up',
      description: 'Zero critical CVEs',
      icon: <ShieldCheck className="h-5 w-5" />,
      accentColor: 'emerald',
      progressBarPct: 99.8,
    },
    {
      id: 'cdn-cache-hit',
      category: 'infra',
      title: 'Edge CDN Cache Hit',
      value: '96.4%',
      change: '42ms avg',
      trend: 'up',
      description: '38 global PoPs',
      icon: <Globe className="h-5 w-5" />,
      accentColor: 'blue',
      progressBarPct: 96.4,
    },
    {
      id: 'p99-latency',
      category: 'infra',
      title: 'P99 Server Latency',
      value: '24.2 ms',
      change: '-14.5%',
      trend: 'up',
      description: 'Faster response',
      icon: <Gauge className="h-5 w-5" />,
      accentColor: 'amber',
      sparklinePoints: [38, 35, 32, 29, 27, 25, 24.2],
    },
    {
      id: 'cloud-storage',
      category: 'infra',
      title: 'Cloud Data Storage',
      value: '4.82 TB',
      change: '+8.5%',
      trend: 'neutral',
      description: '74% of 6.5TB cluster',
      icon: <HardDrive className="h-5 w-5" />,
      accentColor: 'blue',
      progressBarPct: 74,
    },
    {
      id: 'cicd-deploys',
      category: 'infra',
      title: 'CI/CD Deployments',
      value: '42 / wk',
      change: '100% Pass',
      trend: 'up',
      description: 'Avg build 48s',
      icon: <GitBranch className="h-5 w-5" />,
      accentColor: 'rose',
      sparklinePoints: [28, 30, 35, 38, 40, 41, 42],
    },
    {
      id: 'ai-tokens',
      category: 'financial',
      title: 'AI Copilot Inferences',
      value: '1.42M',
      change: '+32.8%',
      trend: 'up',
      description: '99.4% accuracy',
      icon: <Bot className="h-5 w-5" />,
      accentColor: 'fuchsia',
      sparklinePoints: [0.8, 0.95, 1.05, 1.18, 1.29, 1.35, 1.42],
    },
    {
      id: 'system-uptime',
      category: 'security',
      title: 'High Availability SLA',
      value: '99.995%',
      change: 'Zero Incidents',
      trend: 'up',
      description: 'Last 90 days',
      icon: <Activity className="h-5 w-5" />,
      accentColor: 'emerald',
      progressBarPct: 99.99,
    },
  ];

  const filteredKpis = kpis.filter((kpi) => {
    if (activeFilter === 'all') return true;
    return kpi.category === activeFilter;
  });

  return (
    <div className="space-y-3">
      {/* KPI Section Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Activity className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-sm font-extrabold text-foreground tracking-tight">
            Key Performance Indicators (10 Metric Counts)
          </h2>
          <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0">
            Live Telemetry
          </Badge>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/60">
          {(
            [
              { id: 'all', label: 'All 10 Cards' },
              { id: 'financial', label: 'Revenue & Growth' },
              { id: 'infra', label: 'Infrastructure & APIs' },
              { id: 'security', label: 'Security & Uptime' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={cn(
                'px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer',
                activeFilter === tab.id
                  ? 'bg-card text-foreground shadow-2xs font-bold border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Grid of 10 Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {filteredKpis.map((kpi) => (
          <KpiMetricCard key={kpi.id} {...kpi} />
        ))}
      </div>
    </div>
  );
};
