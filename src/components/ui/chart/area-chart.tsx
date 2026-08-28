import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { cn } from '@/lib/utils';

export interface AreaChartPoint {
  label: string;
  series1: number;
  series2?: number;
}

export interface AreaChartProps {
  title: string;
  description?: string;
  data: AreaChartPoint[];
  series1Name?: string;
  series2Name?: string;
  series1Color?: string;
  series2Color?: string;
  height?: number;
  className?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  title,
  description,
  data,
  series1Name = 'Revenue ($)',
  series2Name = 'Target ($)',
  series1Color = '#3b82f6',
  series2Color = '#10b981',
  height = 240,
  className,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const allValues = data.flatMap((d) => [d.series1, d.series2 || 0]);
  const maxValue = Math.max(...allValues, 100);
  const paddingX = 40;
  const paddingY = 30;
  const chartWidth = 700;
  const chartHeight = height;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * (chartWidth - paddingX * 2);
  const getY = (val: number) => chartHeight - paddingY - (val / maxValue) * (chartHeight - paddingY * 2);

  // Build SVG Path string
  const buildPath = (values: number[]) => {
    return values
      .map((val, idx) => {
        const x = getX(idx);
        const y = getY(val);
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const path1 = buildPath(data.map((d) => d.series1));
  const area1 = `${path1} L ${getX(data.length - 1)} ${chartHeight - paddingY} L ${getX(0)} ${chartHeight - paddingY} Z`;

  const hasSeries2 = data.some((d) => d.series2 !== undefined);
  const path2 = hasSeries2 ? buildPath(data.map((d) => d.series2 || 0)) : '';
  const area2 = hasSeries2
    ? `${path2} L ${getX(data.length - 1)} ${chartHeight - paddingY} L ${getX(0)} ${chartHeight - paddingY} Z`
    : '';

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series1Color }} />
            <span className="text-foreground">{series1Name}</span>
          </div>
          {hasSeries2 && (
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series2Color }} />
              <span className="text-foreground">{series2Name}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-x-auto custom-scrollbar">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto min-w-[550px] select-none"
            style={{ maxHeight: height }}
          >
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={series1Color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={series1Color} stopOpacity={0.0} />
              </linearGradient>
              {hasSeries2 && (
                <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={series2Color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={series2Color} stopOpacity={0.0} />
                </linearGradient>
              )}
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              const val = Math.round(ratio * maxValue);
              return (
                <g key={i}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="currentColor"
                    className="text-border/40"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-muted-foreground text-[10px] font-mono"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Filled Areas */}
            <path d={area1} fill="url(#gradient1)" />
            {hasSeries2 && <path d={area2} fill="url(#gradient2)" />}

            {/* Smooth Stroke Lines */}
            <path d={path1} fill="none" stroke={series1Color} strokeWidth="2.5" strokeLinecap="round" />
            {hasSeries2 && <path d={path2} fill="none" stroke={series2Color} strokeWidth="2" strokeDasharray="3 3" />}

            {/* X Axis Labels & Hover Hit Areas */}
            {data.map((pt, i) => {
              const x = getX(i);
              const y1 = getY(pt.series1);
              const isHovered = hoverIndex === i;

              return (
                <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
                  {/* Invisible Hitbox */}
                  <rect
                    x={x - 20}
                    y={0}
                    width={40}
                    height={chartHeight}
                    fill="transparent"
                    className="cursor-pointer"
                  />

                  {/* Vertical Crosshair */}
                  {isHovered && (
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={chartHeight - paddingY}
                      stroke={series1Color}
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Data Points */}
                  <circle
                    cx={x}
                    cy={y1}
                    r={isHovered ? 5 : 3.5}
                    fill={series1Color}
                    className="transition-all duration-150"
                  />

                  {/* Label */}
                  <text
                    x={x}
                    y={chartHeight - 8}
                    textAnchor="middle"
                    className={cn(
                      'text-[10px] font-semibold transition-colors',
                      isHovered ? 'fill-primary font-bold' : 'fill-muted-foreground'
                    )}
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Tooltip Card */}
          {hoverIndex !== null && data[hoverIndex] && (
            <div
              className="absolute top-2 z-20 pointer-events-none rounded-md bg-slate-900 text-white px-3 py-2 text-xs shadow-xl border border-slate-700 animate-in fade-in zoom-in-95"
              style={{ left: `${(hoverIndex / (data.length - 1)) * 80 + 10}%` }}
            >
              <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 mb-1">
                {data[hoverIndex].label}
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-mono">
                <span>{series1Name}:</span>
                <strong>{data[hoverIndex].series1.toLocaleString()}</strong>
              </div>
              {hasSeries2 && data[hoverIndex].series2 !== undefined && (
                <div className="flex items-center gap-2 text-sky-400 font-mono">
                  <span>{series2Name}:</span>
                  <strong>{data[hoverIndex].series2?.toLocaleString()}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
