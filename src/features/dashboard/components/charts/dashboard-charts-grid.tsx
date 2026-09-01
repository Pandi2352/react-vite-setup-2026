import React, { useState } from 'react';
import { RevenueForecastChart } from './revenue-forecast-chart';
import { TrafficBarChart } from './traffic-bar-chart';
import { StorageDonutChart } from './storage-donut-chart';
import { LiveStreamingEventChart } from './live-streaming-event-chart';
import { SecurityRadarChart } from './security-radar-chart';
import { SystemLayersAreaChart } from './system-layers-area-chart';
import { RegionalLatencyHeatmap } from './regional-latency-heatmap';
import { ConversionFunnelChart } from './conversion-funnel-chart';
import { PolarDistributionChart } from './polar-distribution-chart';
import { LatencyHistogramChart } from './latency-histogram-chart';
import { BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const DashboardChartsGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'financial' | 'infra' | 'security'>('all');

  const categories = [
    { id: 'all' as const, label: 'All 10 Charts' },
    { id: 'financial' as const, label: 'Financial & Growth (2)' },
    { id: 'infra' as const, label: 'Infra & Performance (6)' },
    { id: 'security' as const, label: 'Security & Clients (2)' },
  ];

  return (
    <div className="space-y-4">
      {/* Charts Header & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-500">
            <BarChart3 className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-sm font-extrabold text-foreground tracking-tight">
            Live Analytics & Telemetry Charts (10 Colorful Visuals)
          </h2>
          <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
            Real-Time SVG
          </Badge>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer',
                selectedCategory === cat.id
                  ? 'bg-card text-foreground shadow-2xs font-bold border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 10 Live Charts */}
      <div className="grid gap-4.5 lg:grid-cols-2">
        {/* Financial Category */}
        {(selectedCategory === 'all' || selectedCategory === 'financial') && (
          <>
            <RevenueForecastChart />
            <ConversionFunnelChart />
          </>
        )}

        {/* Infrastructure & Performance Category */}
        {(selectedCategory === 'all' || selectedCategory === 'infra') && (
          <>
            <TrafficBarChart />
            <LiveStreamingEventChart />
            <StorageDonutChart />
            <SystemLayersAreaChart />
            <RegionalLatencyHeatmap />
            <LatencyHistogramChart />
          </>
        )}

        {/* Security & Client Distribution */}
        {(selectedCategory === 'all' || selectedCategory === 'security') && (
          <>
            <SecurityRadarChart />
            <PolarDistributionChart />
          </>
        )}
      </div>
    </div>
  );
};
