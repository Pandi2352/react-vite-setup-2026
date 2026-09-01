import React, { useState, useRef, useEffect } from 'react';
import { useLiveClock } from './use-live-clock';
import { TimezonePickerDialog } from './timezone-picker-dialog';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LiveClockProps {
  className?: string;
  showSeconds?: boolean;
  showDate?: boolean;
  compact?: boolean;
}

export const LiveClock: React.FC<LiveClockProps> = ({
  className,
  showSeconds: propShowSeconds,
  showDate: propShowDate,
  compact = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const clock = useLiveClock();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const showDate = propShowDate !== undefined ? propShowDate : clock.preferences.showDate;
  const showSeconds = propShowSeconds !== undefined ? propShowSeconds : clock.preferences.showSeconds;

  // Handle click outside to close popover
  useEffect(() => {
    if (!isDialogOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsDialogOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDialogOpen]);

  return (
    <div ref={wrapperRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
        className={cn(
          'group relative inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-150 cursor-pointer select-none text-xs',
          isDialogOpen && 'border-primary/60 bg-card text-primary',
          className
        )}
        aria-label={`Live clock: ${clock.formattedTime}. Current timezone: ${clock.activeTimezoneOption.label}`}
        aria-expanded={isDialogOpen}
      >
        {/* Animated Clock Icon with subtle pulse */}
        <div className="relative flex items-center justify-center">
          <Clock
            className={cn(
              'h-3.5 w-3.5 transition-colors',
              isDialogOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
            )}
          />
          <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
        </div>

        {/* Time & Optional Date */}
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'font-mono font-bold tracking-tight transition-colors',
              isDialogOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
            )}
          >
            {clock.formattedTime}
          </span>

          {showDate && !compact && (
            <span className="hidden sm:inline text-[11px] text-muted-foreground font-medium border-l border-border/60 pl-1.5">
              {clock.formattedDateShort}
            </span>
          )}
        </div>

        {/* Timezone Badge */}
        <span
          className={cn(
            'text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors border',
            isDialogOpen
              ? 'bg-primary/10 text-primary border-primary/30'
              : 'bg-muted/60 text-muted-foreground group-hover:text-primary border-border/40'
          )}
        >
          {clock.timezoneCode}
        </span>
      </button>

      {/* Global Timezone Picker Dropdown */}
      <TimezonePickerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        preferences={{
          ...clock.preferences,
          showSeconds,
          showDate,
        }}
        activeTimezone={clock.activeTimezoneOption}
        onSelectTimezone={clock.setTimezone}
        onToggleHour12={clock.setHour12}
        onToggleSeconds={clock.setShowSeconds}
        onToggleDate={clock.setShowDate}
        formattedTimePreview={clock.formattedTime}
        formattedDatePreview={clock.formattedDate}
      />
    </div>
  );
};
