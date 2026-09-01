import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Gauge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const LatencyHistogramChart: React.FC = () => {
  const buckets = [
    { range: '<10ms', count: 18400, color: '#10b981', tier: 'Ultra Fast' },
    { range: '10-25ms', count: 42300, color: '#3b82f6', tier: 'Fast (P50)' },
    { range: '25-50ms', count: 28900, color: '#6366f1', tier: 'Target (P90)' },
    { range: '50-100ms', count: 6800, color: '#f59e0b', tier: 'Acceptable' },
    { range: '>100ms', count: 1200, color: '#f43f5e', tier: 'P99 Spike' },
  ];

  const maxCount = 45000;
  const width = 500;
  const height = 180;
  const paddingX = 35;
  const paddingY = 20;

  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Gauge className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              10. API Latency Distribution Histogram
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            P50, P90, and P99 response bucket counts
          </CardDescription>
        </div>

        <Badge variant="success" className="text-[10px] font-mono px-1.5 py-0">
          98.8% &lt;50ms
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        {/* SVG Histogram */}
        <div className="w-full relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            {/* Grid */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = height - paddingY - ratio * (height - paddingY * 2);
              return (
                <line
                  key={ratio}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  className="text-border/40"
                  strokeDasharray="3 3"
                />
              );
            })}

            {/* Render Histogram Bars */}
            {buckets.map((b, idx) => {
              const barWidth = (width - paddingX * 2) / buckets.length - 16;
              const barX = paddingX + idx * ((width - paddingX * 2) / buckets.length) + 8;
              const barHeight = (b.count / maxCount) * (height - paddingY * 2);
              const barY = height - paddingY - barHeight;

              return (
                <g key={b.range}>
                  {/* Histogram Column */}
                  <rect
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill={b.color}
                    fillOpacity="0.85"
                    className="hover:opacity-100 transition-opacity cursor-pointer"
                  />

                  {/* Count Value on Top */}
                  <text
                    x={barX + barWidth / 2}
                    y={barY - 4}
                    textAnchor="middle"
                    className="text-[9px] font-mono font-bold fill-foreground"
                  >
                    {(b.count / 1000).toFixed(1)}k
                  </text>

                  {/* Range Label on Bottom */}
                  <text
                    x={barX + barWidth / 2}
                    y={height - 4}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-muted-foreground"
                  >
                    {b.range}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};
