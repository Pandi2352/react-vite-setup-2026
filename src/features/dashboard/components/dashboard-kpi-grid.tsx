import React from 'react';
import { Users, Activity, ShieldCheck, Cpu } from 'lucide-react';
import { StatsCard } from './stats-card';

export const DashboardKpiGrid: React.FC = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Users"
        value="1,248"
        change="+12%"
        trend="up"
        description="vs. last month"
        icon={<Users className="h-5 w-5" />}
      />
      <StatsCard
        title="Active Sessions"
        value="342"
        change="+8%"
        trend="up"
        description="Currently online"
        icon={<Activity className="h-5 w-5" />}
      />
      <StatsCard
        title="Security Health"
        value="99.8%"
        change="Optimal"
        trend="up"
        description="Zero security alerts"
        icon={<ShieldCheck className="h-5 w-5" />}
      />
      <StatsCard
        title="System Load"
        value="14.2%"
        change="Normal"
        trend="neutral"
        description="Response time: 42ms"
        icon={<Cpu className="h-5 w-5" />}
      />
    </div>
  );
};
