import React from 'react';
import { useAuthStore } from '@/store/auth-store';
import { DashboardBanner } from '../components/dashboard-banner';
import { DashboardKpiGrid } from '../components/dashboard-kpi-grid';
import { DashboardCharts } from '../components/dashboard-charts';
import { DashboardActivityFeed } from '../components/dashboard-activity-feed';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <DashboardBanner userName={user?.name} />
      <DashboardKpiGrid />
      <DashboardCharts />
      <DashboardActivityFeed />
    </div>
  );
};
