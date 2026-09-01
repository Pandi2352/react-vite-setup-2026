import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MOCK_SECURITY_RADAR } from '../../data/mock-chart-data';
import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const SecurityRadarChart: React.FC = () => {
  return (
    <Card className="flex flex-col justify-between shadow-sm border-border/80 bg-card/95 backdrop-blur-xs overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-foreground">
              5. 5-Axis Security & Threat Radar
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Security posture vs compliance target
          </CardDescription>
        </div>

        <Badge variant="success" className="text-[10px] font-mono px-1.5 py-0">
          99.8% Grade A+
        </Badge>
      </CardHeader>

      <CardContent className="p-4 pt-1">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-2 h-44">
          <div className="h-44 w-48 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={MOCK_SECURITY_RADAR} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <PolarGrid stroke="currentColor" className="text-border/40" />
                <PolarAngleAxis dataKey="subject" stroke="#888888" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888888" fontSize={8} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.92)',
                    borderColor: 'rgba(51, 65, 85, 0.6)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                    fontSize: '11px',
                    backdropFilter: 'blur(8px)',
                  }}
                  formatter={(val: any) => [`${val}%`, '']}
                />
                <Radar
                  name="Current Posture"
                  dataKey="current"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.45}
                  isAnimationActive={true}
                />
                <Radar
                  name="Compliance Target"
                  dataKey="target"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.2}
                  isAnimationActive={true}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Metric Breakdown */}
          <div className="space-y-1 flex-1 max-w-[180px]">
            {MOCK_SECURITY_RADAR.map((item) => (
              <div key={item.subject} className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium text-[10px] truncate max-w-[110px]">
                  {item.subject}
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-500">
                  {item.current}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
