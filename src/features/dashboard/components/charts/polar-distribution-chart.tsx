import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const PolarDistributionChart: React.FC = () => {
  const petals = [
    { label: 'Chrome / Blink', val: 82, color: '#3b82f6' },
    { label: 'Safari / WebKit', val: 64, color: '#06b6d4' },
    { label: 'Firefox / Gecko', val: 45, color: '#f59e0b' },
    { label: 'Edge / Windows', val: 58, color: '#10b981' },
    { label: 'Mobile Native App', val: 72, color: '#ec4899' },
  ];

  const size = 160;
  const center = size / 2;
  const maxRadius = 60;
  const numPetals = petals.length;

  const getPetalPoints = (index: number, val: number) => {
    const angleStep = (2 * Math.PI) / numPetals;
    const startAngle = index * angleStep - Math.PI / 2;
    const endAngle = startAngle + angleStep;
    const r = (val / 100) * maxRadius;

    const x1 = center + r * Math.cos(startAngle);
    const y1 = center + r * Math.sin(startAngle);
    const x2 = center + r * Math.cos(endAngle);
    const y2 = center + r * Math.sin(endAngle);

    return `M ${center},${center} L ${x1.toFixed(1)},${y1.toFixed(1)} A ${r},${r} 0 0,1 ${x2.toFixed(
      1
    )},${y2.toFixed(1)} Z`;
  };

  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
              <PieChart className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              9. Polar Area Client Distribution
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Client user-agents & platform breakdown
          </CardDescription>
        </div>

        <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
          5 Core Agents
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 h-44">
          {/* Polar Petals SVG */}
          <div className="relative shrink-0">
            <svg width={size} height={size} className="overflow-visible">
              {/* Concentric Background Circles */}
              {[0.33, 0.66, 1].map((lvl) => (
                <circle
                  key={lvl}
                  cx={center}
                  cy={center}
                  r={lvl * maxRadius}
                  fill="none"
                  stroke="currentColor"
                  className="text-border/40"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Render Polar Petals */}
              {petals.map((petal, idx) => (
                <path
                  key={petal.label}
                  d={getPetalPoints(idx, petal.val)}
                  fill={petal.color}
                  fillOpacity="0.7"
                  stroke={petal.color}
                  strokeWidth="1.5"
                  className="hover:opacity-100 transition-opacity"
                />
              ))}
            </svg>
          </div>

          {/* Legend Details */}
          <div className="space-y-1.5 flex-1 max-w-[190px]">
            {petals.map((p) => (
              <div key={p.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-foreground font-medium text-[11px] truncate max-w-[110px]">{p.label}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-foreground">{p.val}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
