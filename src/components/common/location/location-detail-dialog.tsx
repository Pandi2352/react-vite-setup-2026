import React from 'react';
import { LocationInfo } from './location.types';
import { MapPin, Navigation, RefreshCw, Shield, Globe, X, CloudSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { Badge } from '@/components/ui/badge';

export interface LocationDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationInfo;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onDetectGps: () => void;
}

export const LocationDetailDialog: React.FC<LocationDetailDialogProps> = ({
  isOpen,
  onClose,
  location,
  isLoading,
  error,
  onRefresh,
  onDetectGps,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Invisible Click-Outside Layer (No background blur or dimming) */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
      />

      {/* Floating Dropdown Card */}
      <div
        className="absolute right-0 top-full mt-2 z-50 w-[350px] max-w-[94vw] rounded-xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-dialog-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-card/95">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <h2 id="location-dialog-title" className="text-xs font-bold text-foreground">
                Live Location & Weather
              </h2>
              <p className="text-[10px] text-muted-foreground">Free Geolocation & Open-Meteo Weather</p>
            </div>
          </div>
          <IconButton
            icon={<X className="h-3.5 w-3.5" />}
            aria-label="Close location dialog"
            tooltip="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>

        {/* Main City & Weather Banner */}
        <div className="p-3.5 bg-gradient-to-r from-emerald-500/10 via-primary/5 to-transparent border-b border-border space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">{location.flag}</span>
                <span className="text-base font-extrabold text-foreground">{location.city}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {location.region ? `${location.region}, ` : ''}{location.country}
              </p>
            </div>

            {/* Live Weather Pill */}
            {location.temperatureC !== undefined && (
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-card/80 border border-border">
                <span className="text-lg">{location.weatherIcon || '🌤️'}</span>
                <div>
                  <span className="text-xs font-bold font-mono text-foreground">
                    {location.temperatureC}°C
                  </span>
                  <p className="text-[9px] text-muted-foreground leading-none">
                    {location.weatherCondition}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Badge variant="outline" className="text-[9px] font-mono px-1.5 py-0">
              {location.source === 'gps' ? '🛰️ GPS Verified' : '🌐 IP Geolocation'}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-mono">
              Updated: {location.lastUpdated}
            </span>
          </div>
        </div>

        {/* Error Notice if any */}
        {error && (
          <div className="p-2.5 mx-3 mt-3 rounded-md bg-destructive/10 border border-destructive/20 text-[11px] text-destructive">
            {error}
          </div>
        )}

        {/* Details Grid */}
        <div className="p-3 space-y-2">
          {/* Coordinates */}
          <div className="p-2 rounded-lg border border-border bg-card/60 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3 text-primary" /> Coordinates
              </span>
              <span className="font-mono text-foreground font-semibold">
                {location.latitude.toFixed(3)}°, {location.longitude.toFixed(3)}°
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
              <span className="text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3 text-blue-500" /> Timezone
              </span>
              <span className="font-mono text-foreground">{location.timezone || 'Local'}</span>
            </div>
            {location.isp && (
              <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
                <span className="text-muted-foreground flex items-center gap-1">
                  <CloudSun className="h-3 w-3 text-amber-500" /> ISP Network
                </span>
                <span className="font-mono text-foreground truncate max-w-[160px]">
                  {location.isp}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDetectGps}
              disabled={isLoading}
              className="text-xs h-7 gap-1.5 justify-center"
            >
              <Navigation className="h-3 w-3 text-primary" />
              <span>Exact GPS</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="text-xs h-7 gap-1.5 justify-center"
            >
              <RefreshCw className={isLoading ? 'h-3 w-3 animate-spin' : 'h-3 w-3'} />
              <span>{isLoading ? 'Detecting...' : 'Refresh IP'}</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-2.5 border-t border-border bg-card/95 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground font-mono">
            100% Free & Open Source
          </span>
          <Button variant="primary" size="sm" onClick={onClose} className="h-6 text-xs px-3">
            Close
          </Button>
        </div>
      </div>
    </>
  );
};
