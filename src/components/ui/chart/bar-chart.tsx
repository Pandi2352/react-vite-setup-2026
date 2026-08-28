import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface BarChartProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  title,
  description,
  data,
  height = 200,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2" style={{ height: `${height}px` }}>
          {data.map((item, idx) => {
            const heightPercent = (item.value / maxValue) * 100;
            return (
              <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end group">
                <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-semibold">
                  {item.value}
                </div>
                <div
                  className="w-full max-w-[36px] bg-primary/80 hover:bg-primary rounded-t-md transition-all duration-300 shadow-xs"
                  style={{ height: `${Math.max(heightPercent, 4)}%` }}
                />
                <span className="text-[11px] font-medium text-muted-foreground mt-2 truncate w-full text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
