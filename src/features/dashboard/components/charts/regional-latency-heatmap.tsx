import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const RegionalLatencyHeatmap: React.FC = () => {
  const regions = [
    { name: 'US-East (N. Virginia)', latency: 18, status: 'Fast', code: 'iad1' },
    { name: 'US-West (Oregon)', latency: 24, status: 'Fast', code: 'pdx1' },
    { name: 'EU-Central (Frankfurt)', latency: 32, status: 'Fast', code: 'fra1' },
    { name: 'EU-West (London)', latency: 28, status: 'Fast', code: 'lhr1' },
    { name: 'AP-South (Mumbai)', latency: 38, status: 'Fast', code: 'bom1' },
    { name: 'AP-Southeast (Singapore)', latency: 42, status: 'Good', code: 'sin1' },
    { name: 'AP-Northeast (Tokyo)', latency: 46, status: 'Good', code: 'hnd1' },
    { name: 'SA-East (São Paulo)', latency: 68, status: 'Normal', code: 'gru1' },
  ];

  const getHeatmapColor = (ms: number) => {
    if (ms < 30) return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500';
    if (ms < 50) return 'bg-blue-500/15 border-blue-500/30 text-blue-500';
    return 'bg-amber-500/15 border-amber-500/30 text-amber-500';
  };

  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
              <Globe className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              7. Global Edge Latency Heatmap
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Round-trip ping across 8 global edge nodes
          </CardDescription>
        </div>

        <Badge variant="success" className="text-[10px] font-mono px-1.5 py-0">
          37ms Global Avg
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 h-44 items-center">
          {regions.map((reg) => (
            <div
              key={reg.code}
              className={`p-2.5 rounded-xl border flex flex-col justify-between h-20 transition-all hover:scale-105 cursor-pointer ${getHeatmapColor(
                reg.latency
              )}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase opacity-80">{reg.code}</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-card/60 font-semibold font-mono">{reg.status}</span>
              </div>

              <div>
                <span className="text-base font-extrabold font-mono leading-none">{reg.latency} ms</span>
                <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">{reg.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
