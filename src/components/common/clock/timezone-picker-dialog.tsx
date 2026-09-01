import React, { useState, useMemo } from 'react';
import {
  TIMEZONE_OPTIONS,
  TimezoneOption,
  ClockPreferences,
} from './clock.types';
import { Search, Globe, Clock, Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface TimezonePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: ClockPreferences;
  activeTimezone: TimezoneOption;
  onSelectTimezone: (ianaZone: string) => void;
  onToggleHour12: (h12: boolean) => void;
  onToggleSeconds: (sec: boolean) => void;
  onToggleDate: (dt: boolean) => void;
  formattedTimePreview: string;
  formattedDatePreview: string;
}

export const TimezonePickerDialog: React.FC<TimezonePickerDialogProps> = ({
  isOpen,
  onClose,
  preferences,
  activeTimezone,
  onSelectTimezone,
  onToggleHour12,
  onToggleSeconds,
  onToggleDate,
  formattedTimePreview,
  formattedDatePreview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return TIMEZONE_OPTIONS;
    const q = searchQuery.toLowerCase();
    return TIMEZONE_OPTIONS.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.city.toLowerCase().includes(q) ||
        opt.country.toLowerCase().includes(q) ||
        opt.offsetLabel.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <>
      {/* Invisible Click-Outside Layer (No background blur or dimming) */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
      />

      {/* Clean Dropdown Popover Anchored Right Under Clock Button */}
      <div
        className="absolute right-0 top-full mt-2 z-50 w-[360px] max-w-[94vw] rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="clock-settings-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-card/95">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h2 id="clock-settings-title" className="text-xs font-bold text-foreground">
                Time & World Timezone
              </h2>
              <p className="text-[10px] text-muted-foreground">Select global region & clock formats</p>
            </div>
          </div>
          <IconButton
            icon={<X className="h-3.5 w-3.5" />}
            aria-label="Close time & timezone dialog"
            tooltip="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>

        {/* Live Preview Card */}
        <div className="p-3 bg-muted/20 border-b border-border flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">
              Live Time ({activeTimezone.city})
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold font-mono text-primary">
                {formattedTimePreview}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {formattedDatePreview}
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="font-mono text-[10px] px-2 py-0.5">
            {activeTimezone.flag} {activeTimezone.offsetLabel}
          </Badge>
        </div>

        {/* Quick Format Toggles */}
        <div className="p-3 border-b border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-foreground">Display Settings</span>
            <button
              type="button"
              onClick={() => onSelectTimezone('local')}
              className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-2.5 w-2.5" /> Reset Local
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {/* 12h vs 24h */}
            <button
              type="button"
              onClick={() => onToggleHour12(!preferences.hour12)}
              className={cn(
                'flex items-center justify-center gap-1.5 p-1.5 rounded-md border text-[10px] font-semibold transition-colors cursor-pointer',
                preferences.hour12
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              <Clock className="h-3 w-3 shrink-0" />
              <span>{preferences.hour12 ? '12-Hour' : '24-Hour'}</span>
            </button>

            {/* Seconds */}
            <button
              type="button"
              onClick={() => onToggleSeconds(!preferences.showSeconds)}
              className={cn(
                'flex items-center justify-center gap-1 p-1.5 rounded-md border text-[10px] font-semibold transition-colors cursor-pointer',
                preferences.showSeconds
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              <span className="font-mono font-bold">:ss</span>
              <span>{preferences.showSeconds ? 'Seconds' : 'No Sec'}</span>
            </button>

            {/* Date */}
            <button
              type="button"
              onClick={() => onToggleDate(!preferences.showDate)}
              className={cn(
                'flex items-center justify-center gap-1 p-1.5 rounded-md border text-[10px] font-semibold transition-colors cursor-pointer',
                preferences.showDate
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:text-foreground'
              )}
            >
              <span>📅</span>
              <span>{preferences.showDate ? 'Date On' : 'Date Off'}</span>
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="p-2.5 border-b border-border bg-card">
          <div className="relative">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city, region or timezone..."
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Scrollable Region Options */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar max-h-52">
          {filteredOptions.map((option) => {
            const isSelected = activeTimezone.ianaZone === option.ianaZone;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onSelectTimezone(option.ianaZone);
                  onClose();
                }}
                className={cn(
                  'w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer text-left',
                  isSelected
                    ? 'bg-primary/10 text-primary font-semibold border border-primary/30'
                    : 'hover:bg-muted/40 text-foreground'
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm leading-none shrink-0">{option.flag}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs truncate leading-tight">{option.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate leading-tight">
                      {option.city}, {option.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="outline" className="font-mono text-[9px] px-1 py-0">
                    {option.offsetLabel}
                  </Badge>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                </div>
              </button>
            );
          })}

          {filteredOptions.length === 0 && (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No timezones matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-border bg-card/95 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-mono">
            Auto-saved locally
          </span>
          <Button variant="primary" size="sm" onClick={onClose} className="h-6 text-xs px-2.5">
            Done
          </Button>
        </div>
      </div>
    </>
  );
};
