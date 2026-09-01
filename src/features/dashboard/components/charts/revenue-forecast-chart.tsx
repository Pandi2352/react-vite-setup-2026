import React, { useState } from 'react';
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
import { MOCK_REVENUE_6M, MOCK_REVENUE_12M } from '../../data/mock-chart-data';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const RevenueForecastChart: React.FC = () => {
  const [period, setPeriod] = useState<'6m' | '12m'>('6m');
  const data = period === '6m' ? MOCK_REVENUE_6M : MOCK_REVENUE_12M;

  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card/95 backdrop-blur-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <DollarSign className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              1. Revenue & Profit Spline Wave
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Gross Revenue vs Net Profit ($K)
          </CardDescription>
        </div>

        <div className="flex items-center gap-1.5">
          <Badge variant="success" className="text-[10px] font-mono px-1.5 py-0">
            <TrendingUp className="h-3 w-3 mr-0.5" /> +28.4%
          </Badge>
          <div className="flex bg-muted/40 p-0.5 rounded-md border border-border/60 text-[10px]">
            <button
              onClick={() => setPeriod('6m')}
              className={cn(
                'px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors',
                period === '6m' ? 'bg-card text-foreground font-bold shadow-2xs' : 'text-muted-foreground'
              )}
            >
              6M
            </button>
            <button
              onClick={() => setPeriod('12m')}
              className={cn(
                'px-2 py-0.5 rounded font-semibold cursor-pointer transition-colors',
                period === '12m' ? 'bg-card text-foreground font-bold shadow-2xs' : 'text-muted-foreground'
              )}
            >
              12M
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] mb-2 font-medium">
          <div className="flex items-center gap-1.5 text-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
            <span>Gross Revenue</span>
          </div>
          <div className="flex items-center gap-1.5 text-foreground">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.6)]" />
            <span>Net Profit</span>
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="rechartsRevGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="rechartsProfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/40" />
              <XAxis dataKey="month" stroke="#888888" fontSize={10} tickLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={10}
                tickLine={false}
                tickFormatter={(val) => `$${val / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.92)',
                  borderColor: 'rgba(51, 65, 85, 0.6)',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '11px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#rechartsRevGrad)"
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#06b6d4"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#rechartsProfGrad)"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
