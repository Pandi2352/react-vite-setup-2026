import React from 'react';
import { FpsDataPoint, MemoryDataPoint } from '../types/telemetry.types';
import { Activity, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface TelemetryLiveChartsProps {
  fps: number;
  fpsHistory: FpsDataPoint[];
  memoryUsedMB: number;
  memoryTotalMB: number;
  memoryHistory: MemoryDataPoint[];
}

export const TelemetryLiveCharts: React.FC<TelemetryLiveChartsProps> = ({
  fps,
  fpsHistory,
  memoryUsedMB,
  memoryTotalMB,
  memoryHistory,
}) => {
  // Render SVG Sparkline path for FPS
  const renderFpsPath = () => {
    if (fpsHistory.length < 2) return '';
    const width = 280;
    const height = 48;
    const maxFps = 60;

    const points = fpsHistory.map((pt, i) => {
      const x = (i / (fpsHistory.length - 1)) * width;
      const y = height - (pt.fps / maxFps) * (height - 8) - 4;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  // Render SVG Sparkline path for Memory
  const renderMemoryPath = () => {
    if (memoryHistory.length < 2) return '';
    const width = 280;
    const height = 48;
    const maxMem = 80;

    const points = memoryHistory.map((pt, i) => {
      const x = (i / (memoryHistory.length - 1)) * width;
      const y = height - (Math.min(pt.usedMB, maxMem) / maxMem) * (height - 8) - 4;
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="space-y-3">
      {/* 1. FPS Streaming Chart */}
      <div className="p-3.5 rounded-lg border border-border bg-card/60 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
              <Activity className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Frame Rate (FPS)</p>
              <p className="text-[10px] text-muted-foreground">Target: 60 fps (16.6ms frame budget)</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-emerald-500 font-mono">{fps}</span>
            <Badge variant="success" className="text-[9px] px-1 py-0">Smooth</Badge>
          </div>
        </div>

        {/* Live SVG Graph */}
        <div className="h-14 w-full bg-muted/20 rounded border border-border/60 overflow-hidden relative flex items-end">
          <svg className="w-full h-full" viewBox="0 0 280 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fpsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid line at 60fps */}
            <line x1="0" y1="4" x2="280" y2="4" stroke="#10b981" strokeDasharray="3 3" strokeOpacity="0.4" />
            {fpsHistory.length >= 2 && (
              <>
                <path
                  d={`${renderFpsPath()} L 280,48 L 0,48 Z`}
                  fill="url(#fpsGrad)"
                />
                <path
                  d={renderFpsPath()}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
          <span className="absolute bottom-1 right-2 text-[8px] font-mono text-muted-foreground">Live Stream</span>
        </div>
      </div>

      {/* 2. JS Heap Memory Chart */}
      <div className="p-3.5 rounded-lg border border-border bg-card/60 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-blue-500/10 text-blue-500">
              <Cpu className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">JS Heap Memory</p>
              <p className="text-[10px] text-muted-foreground">Used / Allocated Memory</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-extrabold text-blue-500 font-mono">{memoryUsedMB} MB</span>
            <span className="text-[10px] text-muted-foreground">/ {memoryTotalMB} MB</span>
          </div>
        </div>

        {/* Live SVG Graph */}
        <div className="h-14 w-full bg-muted/20 rounded border border-border/60 overflow-hidden relative flex items-end">
          <svg className="w-full h-full" viewBox="0 0 280 48" preserveAspectRatio="none">
            <defs>
              <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {memoryHistory.length >= 2 && (
              <>
                <path
                  d={`${renderMemoryPath()} L 280,48 L 0,48 Z`}
                  fill="url(#memGrad)"
                />
                <path
                  d={renderMemoryPath()}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
          <span className="absolute bottom-1 right-2 text-[8px] font-mono text-muted-foreground">Real-Time Heap</span>
        </div>
      </div>
    </div>
  );
};
