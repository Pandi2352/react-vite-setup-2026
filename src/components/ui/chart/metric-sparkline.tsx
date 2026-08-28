import React from 'react';
import { cn } from '@/lib/utils';

export interface MetricSparklineProps {
  data: number[];
  color?: 'primary' | 'emerald' | 'amber' | 'rose' | 'indigo';
  height?: number;
  width?: number;
  className?: string;
}

export const MetricSparkline: React.FC<MetricSparklineProps> = ({
  data,
  color = 'primary',
  height = 36,
  width = 100,
  className,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const strokeColors = {
    primary: '#3b82f6',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#f43f5e',
    indigo: '#6366f1',
  };

  const points = data
    .map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      width={width}
      height={height}
      className={cn('overflow-visible shrink-0', className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        fill="none"
        stroke={strokeColors[color]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};
