import React, { useState, useRef, useEffect } from 'react';
import { useLiveLocation } from './use-live-location';
import { LocationDetailDialog } from './location-detail-dialog';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LiveLocationProps {
  className?: string;
  showWeather?: boolean;
}

export const LiveLocation: React.FC<LiveLocationProps> = ({
  className,
  showWeather = true,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { location, isLoading, error, refreshLocation, detectGpsLocation } = useLiveLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Click outside listener
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
          'group relative inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-border/80 bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-150 cursor-pointer select-none text-xs',
          isDialogOpen && 'border-primary/60 bg-card text-primary',
          className
        )}
        aria-label={`Live location: ${location.city}, ${location.country}`}
        aria-expanded={isDialogOpen}
      >
        {/* Animated Pin Icon */}
        <div className="relative flex items-center justify-center">
          <MapPin
            className={cn(
              'h-3.5 w-3.5 transition-colors',
              isDialogOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
            )}
          />
          <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
        </div>

        {/* Flag & City */}
        <div className="flex items-center gap-1">
          <span className="text-xs leading-none">{location.flag}</span>
          <span
            className={cn(
              'font-semibold transition-colors max-w-[90px] truncate',
              isDialogOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
            )}
          >
            {location.city}
          </span>
        </div>

        {/* Weather Chip */}
        {showWeather && location.temperatureC !== undefined && (
          <span className="hidden md:inline-flex items-center gap-0.5 text-[11px] text-muted-foreground font-mono border-l border-border/60 pl-1">
            <span>{location.weatherIcon}</span>
            <span>{location.temperatureC}°C</span>
          </span>
        )}
      </button>

      {/* Location & Weather Details Dropdown */}
      <LocationDetailDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        location={location}
        isLoading={isLoading}
        error={error}
        onRefresh={refreshLocation}
        onDetectGps={detectGpsLocation}
      />
    </div>
  );
};
