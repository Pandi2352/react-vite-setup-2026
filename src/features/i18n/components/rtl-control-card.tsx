import React from 'react';
import { AlignLeft, AlignRight, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface RtlControlCardProps {
  isRtl: boolean;
  forceRtl: boolean | null;
  onSetForceRtl: (override: boolean | null) => void;
}

export const RtlControlCard: React.FC<RtlControlCardProps> = ({
  isRtl,
  forceRtl,
  onSetForceRtl,
}) => {
  return (
    <div className="space-y-3 p-3.5 rounded-xl border border-border bg-card/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <ArrowRightLeft className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">RTL Document Mirroring</h3>
            <p className="text-[10px] text-muted-foreground">HTML dir=&quot;{isRtl ? 'rtl' : 'ltr'}&quot; switcher</p>
          </div>
        </div>

        <Badge variant={isRtl ? 'warning' : 'secondary'} className="text-[9px] font-mono px-1.5 py-0">
          {isRtl ? 'RTL Active (Mirrored)' : 'LTR Active (Standard)'}
        </Badge>
      </div>

      {/* Direction Override Buttons */}
      <div className="grid grid-cols-3 gap-1.5 pt-1">
        {/* Auto Mode */}
        <button
          type="button"
          onClick={() => onSetForceRtl(null)}
          className={cn(
            'flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] font-semibold transition-colors cursor-pointer text-center',
            forceRtl === null
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-card text-muted-foreground hover:text-foreground'
          )}
        >
          <RefreshCw className="h-3 w-3 mb-1" />
          <span>Auto Locale</span>
        </button>

        {/* Force LTR */}
        <button
          type="button"
          onClick={() => onSetForceRtl(false)}
          className={cn(
            'flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] font-semibold transition-colors cursor-pointer text-center',
            forceRtl === false
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-card text-muted-foreground hover:text-foreground'
          )}
        >
          <AlignLeft className="h-3 w-3 mb-1" />
          <span>Force LTR</span>
        </button>

        {/* Force RTL */}
        <button
          type="button"
          onClick={() => onSetForceRtl(true)}
          className={cn(
            'flex flex-col items-center justify-center p-2 rounded-lg border text-[10px] font-semibold transition-colors cursor-pointer text-center',
            forceRtl === true
              ? 'border-amber-500 bg-amber-500/10 text-amber-500 font-bold'
              : 'border-border bg-card text-muted-foreground hover:text-foreground'
          )}
        >
          <AlignRight className="h-3 w-3 mb-1" />
          <span>Force RTL</span>
        </button>
      </div>

      {/* Layout Mirror Preview Diagram */}
      <div className="p-2.5 rounded-lg bg-muted/30 border border-border/60 space-y-1.5">
        <p className="text-[10px] font-bold text-foreground">Document Layout Flow Preview</p>
        <div className={cn(
          'flex items-center gap-2 p-2 rounded bg-card border border-border text-xs transition-all duration-300',
          isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'
        )}>
          <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0">
            1
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[11px] truncate">
              {isRtl ? 'العناصر محاذاة لليمين' : 'Left-aligned items'}
            </p>
            <p className="text-[9px] text-muted-foreground truncate">
              {isRtl ? 'انعكاس كامل لاتجاه الصفحة' : 'Standard LTR reading flow'}
            </p>
          </div>
          <div className="h-6 w-6 rounded bg-muted flex items-center justify-center text-[10px] shrink-0 font-mono text-muted-foreground">
            2
          </div>
        </div>
      </div>
    </div>
  );
};
