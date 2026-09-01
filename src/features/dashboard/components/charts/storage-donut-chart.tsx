import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_STORAGE_SEGMENTS } from '../../data/mock-chart-data';
import { HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const StorageDonutChart: React.FC = () => {
  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card/95 backdrop-blur-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
              <HardDrive className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              3. Cloud Storage & Data Allocation
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            4.82 TB total cluster allocation
          </CardDescription>
        </div>

        <Badge variant="info" className="text-[10px] font-mono px-1.5 py-0">
          74% Capacity
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 h-44">
          {/* Recharts Radial Donut */}
          <div className="relative h-40 w-40 shrink-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.92)',
                    borderColor: 'rgba(51, 65, 85, 0.6)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px',
                    backdropFilter: 'blur(8px)',
                  }}
                  formatter={(val: any) => [`${val}% Capacity`, 'Share']}
                />
                <Pie
                  data={MOCK_STORAGE_SEGMENTS}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {MOCK_STORAGE_SEGMENTS.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Central KPI Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold font-mono text-foreground leading-none">4.82</span>
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mt-0.5">TB Used</span>
            </div>
          </div>

          {/* Segment Details List */}
          <div className="space-y-1.5 flex-1 max-w-[200px]">
            {MOCK_STORAGE_SEGMENTS.map((seg) => (
              <div key={seg.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="text-foreground font-medium text-[11px] truncate max-w-[95px]">{seg.name}</span>
                </div>
                <div className="text-right font-mono text-[10px]">
                  <span className="text-foreground font-bold">{seg.value}%</span>
                  <span className="text-muted-foreground ml-1">({seg.sizeGb})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
