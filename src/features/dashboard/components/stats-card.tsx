import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  description,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</span>
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary">{icon}</div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
          {change && (
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                trend === 'up' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                trend === 'down' && 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                trend === 'neutral' && 'bg-muted text-muted-foreground'
              )}
            >
              {change}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
};
