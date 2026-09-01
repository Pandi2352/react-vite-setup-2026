import React from 'react';
import { WebVitalMetric } from '../types/telemetry.types';
import { Badge } from '@/components/ui/badge';

export interface TelemetryVitalsGaugesProps {
  vitals: WebVitalMetric[];
}

export const TelemetryVitalsGauges: React.FC<TelemetryVitalsGaugesProps> = ({ vitals }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-foreground">Core Web Vitals Speedometers</h3>
        <Badge variant="success" className="text-[9px] px-1.5 py-0">100% Passing</Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {vitals.map((metric) => {
          // Calculate percentage for circular gauge (100 = best)
          let pct = 95;
          if (metric.id === 'lcp') {
            pct = Math.max(10, Math.min(100, Math.round(100 - (metric.value / metric.poorThreshold) * 70)));
          } else if (metric.id === 'cls') {
            pct = Math.max(10, Math.min(100, Math.round(100 - (metric.value / metric.poorThreshold) * 80)));
          } else if (metric.id === 'inp') {
            pct = Math.max(10, Math.min(100, Math.round(100 - (metric.value / metric.poorThreshold) * 60)));
          } else if (metric.id === 'fcp') {
            pct = Math.max(10, Math.min(100, Math.round(100 - (metric.value / metric.poorThreshold) * 70)));
          } else if (metric.id === 'ttfb') {
            pct = Math.max(10, Math.min(100, Math.round(100 - (metric.value / metric.poorThreshold) * 75)));
          }

          const radius = 24;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (pct / 100) * circumference;

          return (
            <div
              key={metric.id}
              className="p-3 rounded-lg border border-border bg-card/60 flex flex-col justify-between space-y-2 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {metric.shortName}
                  </span>
                  <p className="text-xs font-bold text-foreground leading-tight">{metric.formattedValue}</p>
                </div>

                {/* Mini Speedometer Circular SVG */}
                <div className="relative flex items-center justify-center h-12 w-12 shrink-0">
                  <svg className="h-12 w-12 -rotate-90 transform" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      className="stroke-muted"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r={radius}
                      className="stroke-emerald-500 transition-all duration-700 ease-out"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-bold text-emerald-500">{pct}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9px] text-muted-foreground">
                  <span>Target: &lt;{metric.goodThreshold}{metric.unit}</span>
                  <span className="text-emerald-500 font-semibold uppercase">{metric.status}</span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-tight">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
