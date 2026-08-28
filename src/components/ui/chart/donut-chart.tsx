import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { cn } from '@/lib/utils';

export interface DonutSegment {
  name: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  title: string;
  description?: string;
  data: DonutSegment[];
  centerLabel?: string;
  className?: string;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  description,
  data,
  centerLabel = 'Total',
  className,
}) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // SVG Arc calculation helper
  let cumulativeAngle = 0;
  const radius = 70;
  const strokeWidth = 24;
  const circumference = 2 * Math.PI * radius;

  const activeSegment = activeSegmentIndex !== null ? data[activeSegmentIndex] : null;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
          {/* SVG Donut Ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90 select-none">
              {data.map((item, index) => {
                const percentage = total > 0 ? item.value / total : 0;
                const strokeDasharray = `${percentage * circumference} ${circumference}`;
                const strokeDashoffset = -cumulativeAngle * circumference;
                cumulativeAngle += percentage;

                const isHovered = activeSegmentIndex === index;

                return (
                  <circle
                    key={item.name}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
                    onMouseEnter={() => setActiveSegmentIndex(index)}
                    onMouseLeave={() => setActiveSegmentIndex(null)}
                  />
                );
              })}
            </svg>

            {/* Donut Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {activeSegment ? activeSegment.name : centerLabel}
              </span>
              <strong className="text-xl font-bold tracking-tight text-foreground">
                {activeSegment ? activeSegment.value.toLocaleString() : total.toLocaleString()}
              </strong>
              {activeSegment && (
                <span className="text-[10px] font-semibold text-primary">
                  {((activeSegment.value / total) * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>

          {/* Interactive Legend List */}
          <div className="space-y-2.5 w-full sm:w-auto min-w-[180px]">
            {data.map((item, index) => {
              const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0';
              const isHovered = activeSegmentIndex === index;

              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveSegmentIndex(index)}
                  onMouseLeave={() => setActiveSegmentIndex(null)}
                  className={cn(
                    'flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer border',
                    isHovered ? 'bg-primary/10 border-primary/30 font-bold' : 'border-transparent hover:bg-muted/40'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-foreground font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-muted-foreground">{item.value.toLocaleString()}</span>
                    <span className="font-semibold text-foreground text-[10px] bg-muted px-1.5 py-0.5 rounded">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
