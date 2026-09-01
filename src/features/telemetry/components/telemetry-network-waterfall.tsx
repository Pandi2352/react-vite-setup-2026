import React from 'react';
import { NetworkWaterfallItem } from '../types/telemetry.types';
import { FileCode, FileText, Type, Image as ImageIcon, Box } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface TelemetryNetworkWaterfallProps {
  waterfall: NetworkWaterfallItem[];
}

export const TelemetryNetworkWaterfall: React.FC<TelemetryNetworkWaterfallProps> = ({ waterfall }) => {
  const totalTransfer = waterfall.reduce((sum, item) => sum + item.transferSizeBytes, 0);
  const totalRaw = waterfall.reduce((sum, item) => sum + item.rawSizeBytes, 0);
  const totalGzipSavings = Math.round(((totalRaw - totalTransfer) / totalRaw) * 100);

  const getIcon = (type: NetworkWaterfallItem['initiatorType']) => {
    switch (type) {
      case 'script':
        return <FileCode className="h-3.5 w-3.5 text-amber-500" />;
      case 'css':
        return <FileText className="h-3.5 w-3.5 text-blue-500" />;
      case 'font':
        return <Type className="h-3.5 w-3.5 text-violet-500" />;
      case 'img':
        return <ImageIcon className="h-3.5 w-3.5 text-emerald-500" />;
      default:
        return <Box className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  const formatKB = (bytes: number) => {
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground">Network Waterfall & Gzip Efficiency</h3>
        <Badge variant="info" className="text-[9px] px-1.5 py-0">{totalGzipSavings}% Gzip Savings</Badge>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg border border-border bg-card/60">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-semibold">Total Transfer</p>
          <p className="text-sm font-extrabold text-foreground font-mono">{formatKB(totalTransfer)}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-semibold">Uncompressed Raw</p>
          <p className="text-sm font-extrabold text-muted-foreground font-mono">{formatKB(totalRaw)}</p>
        </div>
      </div>

      {/* Waterfall Asset List */}
      <div className="space-y-2">
        {waterfall.map((item) => {
          const maxDuration = 100;
          const barStartPct = (item.startTimeMs / 180) * 100;
          const barWidthPct = Math.max(8, (item.durationMs / maxDuration) * 50);

          return (
            <div
              key={item.id}
              className="p-2.5 rounded-lg border border-border bg-card/40 hover:bg-card transition-colors space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {getIcon(item.initiatorType)}
                  <span className="text-xs font-semibold text-foreground truncate">{item.name}</span>
                </div>
                <Badge variant="secondary" className="text-[9px] font-mono px-1 py-0 shrink-0">
                  {item.status} OK
                </Badge>
              </div>

              {/* Size & Gzip Ratio */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                <span>{formatKB(item.transferSizeBytes)} (raw {formatKB(item.rawSizeBytes)})</span>
                <span className="text-emerald-500 font-bold">-{item.gzipRatio}% gzip</span>
              </div>

              {/* Waterfall Timing Bar */}
              <div className="w-full bg-muted/30 h-2 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-primary/80 rounded-full transition-all duration-300"
                  style={{
                    marginLeft: `${Math.min(75, barStartPct)}%`,
                    width: `${Math.min(60, barWidthPct)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                <span>Started at +{item.startTimeMs}ms</span>
                <span className="font-mono">{item.durationMs}ms</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
