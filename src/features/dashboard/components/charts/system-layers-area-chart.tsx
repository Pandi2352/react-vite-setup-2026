import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MOCK_SYSTEM_RESOURCES } from '../../data/mock-chart-data';
import { Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const SystemLayersAreaChart: React.FC = () => {
  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card/95 backdrop-blur-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
              <Layers className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              6. Stacked Layered Resource Capacity
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            CPU, Memory, & GPU stacked allocation
          </CardDescription>
        </div>

        <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
          Peak Load 62%
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] mb-2 font-medium">
          <div className="flex items-center gap-1 text-foreground">
            <span className="h-2.5 w-2.5 rounded bg-blue-500" />
            <span>CPU</span>
          </div>
          <div className="flex items-center gap-1 text-foreground">
            <span className="h-2.5 w-2.5 rounded bg-cyan-500" />
            <span>Memory</span>
          </div>
          <div className="flex items-center gap-1 text-foreground">
            <span className="h-2.5 w-2.5 rounded bg-emerald-500" />
            <span>GPU Tensor</span>
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_SYSTEM_RESOURCES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
              <XAxis dataKey="time" stroke="#888888" fontSize={10} tickLine={false} />
              <YAxis stroke="#888888" fontSize={10} tickLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  borderColor: 'rgba(51, 65, 85, 0.6)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '11px',
                  backdropFilter: 'blur(8px)',
                }}
                formatter={(val: any, name: any) => [`${val}%`, name]}
              />
              <Area
                type="monotone"
                dataKey="cpu"
                name="CPU"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.7}
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="memory"
                name="Memory"
                stackId="1"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.7}
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="gpu"
                name="GPU"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.7}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
