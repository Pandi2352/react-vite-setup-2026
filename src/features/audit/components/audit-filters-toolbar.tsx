import React from 'react';
import { Radio, ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AuditFiltersToolbarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedSeverity: string;
  onSelectSeverity: (severity: string) => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
  onSimulateEvent: () => void;
  onResetFilters: () => void;
}

export const AuditFiltersToolbar: React.FC<AuditFiltersToolbarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSeverity,
  onSelectSeverity,
  isStreaming,
  onToggleStreaming,
  onSimulateEvent,
  onResetFilters,
}) => {
  const categories = [
    { id: 'ALL', label: 'All Events' },
    { id: 'AUTH_IAM', label: 'Auth & IAM' },
    { id: 'SECURITY', label: 'Security & WAF' },
    { id: 'DATABASE_SYSTEM', label: 'Database & System' },
    { id: 'BILLING_API', label: 'Billing & API' },
  ];

  const severities = [
    { id: 'ALL', label: 'All Severities' },
    { id: 'CRITICAL', label: 'Critical' },
    { id: 'WARNING', label: 'Warning' },
    { id: 'INFO', label: 'Info' },
    { id: 'SUCCESS', label: 'Success' },
  ];

  return (
    <div className="space-y-3 p-3.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs">
      {/* Top Row: Category Tabs & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 bg-muted/40 p-1 rounded-lg border border-border/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer',
                selectedCategory === cat.id
                  ? 'bg-card text-foreground shadow-2xs font-bold border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Controls & Simulation Button */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Live Streaming Toggle */}
          <button
            type="button"
            onClick={onToggleStreaming}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold rounded-lg border transition-all cursor-pointer',
              isStreaming
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-muted/50 border-border text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="relative flex h-2 w-2">
              {isStreaming && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={cn(
                  'relative inline-flex rounded-full h-2 w-2',
                  isStreaming ? 'bg-emerald-500' : 'bg-muted-foreground'
                )}
              />
            </span>
            <Radio className="h-3 w-3" />
            <span>{isStreaming ? 'Live Stream: ON' : 'Live Stream: Paused'}</span>
          </button>

          {/* Simulate Security Event */}
          <Button
            variant="outline"
            size="sm"
            onClick={onSimulateEvent}
            className="h-7 text-xs border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
          >
            <ShieldAlert className="h-3.5 w-3.5 mr-1 text-amber-500" />
            Simulate Threat Event
          </Button>

          {/* Reset Filters */}
          {(selectedCategory !== 'ALL' || selectedSeverity !== 'ALL') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>

      {/* Severity Filter Pills */}
      <div className="flex items-center gap-2 text-xs pt-1 border-t border-border/40">
        <span className="text-[11px] font-medium text-muted-foreground">Severity Level:</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {severities.map((sev) => (
            <button
              key={sev.id}
              type="button"
              onClick={() => onSelectSeverity(sev.id)}
              className={cn(
                'px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer',
                selectedSeverity === sev.id
                  ? 'bg-primary text-primary-foreground font-bold shadow-2xs'
                  : 'bg-muted/40 text-muted-foreground hover:text-foreground'
              )}
            >
              {sev.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
