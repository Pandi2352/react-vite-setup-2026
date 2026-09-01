import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Zap, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const LiveStreamingEventChart: React.FC = () => {
  const [points, setPoints] = useState<number[]>([42, 48, 55, 60, 52, 68, 74, 82, 79, 88, 94, 91]);
  const [currentRate, setCurrentRate] = useState(3840);

  // Simulate real-time streaming updates every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextVal = Math.floor(65 + Math.random() * 35);
      setPoints((prev) => [...prev.slice(1), nextVal]);
      setCurrentRate(Math.floor(3600 + Math.random() * 480));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const width = 500;
  const height = 180;
  const paddingX = 35;
  const paddingY = 20;

  const min = 40;
  const max = 110;

  const coords = points.map((pt, idx) => {
    const x = paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((pt - min) / (max - min)) * (height - paddingY * 2);
    return { x, y };
  });

  const polylineStr = coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const lastCoord = coords[coords.length - 1];

  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Zap className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              4. Live Real-Time Event Stream
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Streaming WebSocket telemetry ticks
          </CardDescription>
        </div>

        <Badge variant="warning" className="text-[10px] font-mono px-1.5 py-0 flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Live Stream
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        {/* Real-time Ticker */}
        <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
          <div className="flex items-center gap-1.5 text-foreground">
            <Radio className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
            <span>Ingest: <strong className="text-amber-500">{currentRate.toLocaleString()}</strong> events/sec</span>
          </div>
          <span className="text-muted-foreground text-[10px]">Buffer: 100ms</span>
        </div>

        {/* Live SVG Graph */}
        <div className="w-full relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
            <defs>
              <linearGradient id="streamAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>

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

            {/* Area */}
            <polygon
              points={`${coords[0].x},${height - paddingY} ${polylineStr} ${coords[coords.length - 1].x},${height - paddingY}`}
              fill="url(#streamAreaGrad)"
            />

            {/* Path */}
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylineStr}
            />

            {/* Live Pulsing Dot on Current Head */}
            {lastCoord && (
              <g>
                <circle cx={lastCoord.x} cy={lastCoord.y} r="6" fill="#f59e0b" className="animate-ping opacity-60" />
                <circle cx={lastCoord.x} cy={lastCoord.y} r="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              </g>
            )}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};
