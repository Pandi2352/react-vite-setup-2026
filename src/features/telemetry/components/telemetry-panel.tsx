import React, { useState } from 'react';
import { useTelemetry } from '../hooks/use-telemetry';
import { TelemetryVitalsGauges } from './telemetry-vitals-gauges';
import { TelemetryLiveCharts } from './telemetry-live-charts';
import { TelemetryDomInspector } from './telemetry-dom-inspector';
import { TelemetryNetworkWaterfall } from './telemetry-network-waterfall';
import { Activity, Gauge, BarChart2, Layers, Network, Play, Pause, X } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const TelemetryPanel: React.FC = () => {
  const { setActiveRightPanel } = useUIStore();
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<'vitals' | 'charts' | 'dom' | 'network'>('vitals');

  const telemetry = useTelemetry(isPaused);

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-card/80 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-foreground">Live Telemetry & Vitals</h2>
              <span className="flex h-1.5 w-1.5 relative">
                {!isPaused && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', isPaused ? 'bg-amber-500' : 'bg-emerald-500')} />
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">
              FPS: <strong className="text-emerald-500">{telemetry.fps}</strong> • Heap: <strong className="text-blue-500">{telemetry.memoryUsedMB}MB</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Pause / Resume Live Streaming */}
          <Tooltip content={isPaused ? 'Resume live recording' : 'Pause telemetry stream'} position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPaused(!isPaused)}
              className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1 px-2"
            >
              {isPaused ? <Play className="h-3 w-3 text-emerald-500" /> : <Pause className="h-3 w-3 text-amber-500" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </Button>
          </Tooltip>

          {/* Close Drawer Button */}
          <Tooltip content="Close panel" position="bottom">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveRightPanel(null)}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-border bg-muted/30 p-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('vitals')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'vitals'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Gauge className="h-3.5 w-3.5 text-emerald-500" />
          <span>Vitals</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('charts')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'charts'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <BarChart2 className="h-3.5 w-3.5 text-blue-500" />
          <span>Graphs</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('dom')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'dom'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Layers className="h-3.5 w-3.5 text-violet-500" />
          <span>DOM</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('network')}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer',
            activeTab === 'network'
              ? 'bg-card text-foreground border border-border shadow-2xs'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Network className="h-3.5 w-3.5 text-amber-500" />
          <span>Waterfall</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 custom-scrollbar">
        {activeTab === 'vitals' && <TelemetryVitalsGauges vitals={telemetry.vitals} />}

        {activeTab === 'charts' && (
          <TelemetryLiveCharts
            fps={telemetry.fps}
            fpsHistory={telemetry.fpsHistory}
            memoryUsedMB={telemetry.memoryUsedMB}
            memoryTotalMB={telemetry.memoryTotalMB}
            memoryHistory={telemetry.memoryHistory}
          />
        )}

        {activeTab === 'dom' && <TelemetryDomInspector stats={telemetry.domStats} />}

        {activeTab === 'network' && <TelemetryNetworkWaterfall waterfall={telemetry.networkWaterfall} />}
      </div>

      {/* Panel Footer */}
      <div className="p-3 border-t border-border bg-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px] font-mono">
            {isPaused ? '⏸ Paused' : '🟢 60fps Active'}
          </Badge>
          <span className="text-[10px] text-muted-foreground">Chrome Vitals Engine</span>
        </div>
        <Button variant="primary" size="sm" onClick={() => setActiveRightPanel(null)} className="h-7 text-xs">
          Done
        </Button>
      </div>
    </div>
  );
};
