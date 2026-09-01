import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DocsTechStackCard: React.FC = () => {
  const stackItems = [
    { name: 'React 19', role: 'Concurrent UI Framework', version: 'v19.0.0' },
    { name: 'Vite 8', role: 'Next-Gen Build Engine', version: 'v8.2.2' },
    { name: 'TypeScript', role: 'Type-Safe Architecture', version: 'v5.7.0' },
    { name: 'Tailwind CSS', role: 'Design System & Utility CSS', version: 'v4.0' },
    { name: 'Zustand', role: 'Predictable State Management', version: 'v5.0' },
    { name: 'Vitest', role: '100% Unit Test Suite (33 Tests)', version: 'v3.2' },
    { name: 'Lucide Icons', role: 'Clean Vector Iconography', version: 'v0.470' },
    { name: 'Open-Meteo & OSM', role: '100% Free Geolocation & Weather', version: 'v1.0' },
  ];

  return (
    <div className="space-y-3 p-3.5 rounded-xl border border-border bg-card/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">Architecture & Tech Stack</h3>
            <p className="text-[10px] text-muted-foreground">High-performance enterprise foundation</p>
          </div>
        </div>

        <Badge variant="success" className="text-[9px] font-mono px-1.5 py-0">
          <ShieldCheck className="h-3 w-3 mr-1" /> 100% Passing Tests
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        {stackItems.map((item) => (
          <div
            key={item.name}
            className="p-2 rounded-lg bg-muted/20 border border-border/50 space-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                {item.name}
              </span>
              <span className="text-[9px] font-mono text-primary font-semibold">{item.version}</span>
            </div>
            <p className="text-[10px] text-muted-foreground truncate">{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
