import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ConversionFunnelChart: React.FC = () => {
  const steps = [
    { stage: '1. Landing Page Visitors', count: '100,000', pct: 100, color: '#3b82f6' },
    { stage: '2. Product Signups', count: '34,200', pct: 34.2, color: '#6366f1' },
    { stage: '3. Onboarded Active', count: '18,500', pct: 18.5, color: '#a855f7' },
    { stage: '4. Paid Subscriptions', count: '6,840', pct: 6.84, color: '#10b981' },
  ];

  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Filter className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              8. User Conversion Funnel Waterfall
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Acquisition to paid customer conversion
          </CardDescription>
        </div>

        <Badge variant="success" className="text-[10px] font-mono px-1.5 py-0">
          6.84% Overall Conv
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        <div className="space-y-2.5 h-44 flex flex-col justify-center">
          {steps.map((step) => (
            <div key={step.stage} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground text-[11px]">{step.stage}</span>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-foreground font-bold">{step.count}</span>
                  <span className="text-muted-foreground">({step.pct}%)</span>
                </div>
              </div>

              {/* Stepped Horizontal Bar */}
              <div className="h-2.5 w-full rounded-full bg-muted/40 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${step.pct}%`,
                    backgroundColor: step.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
