import React from 'react';
import { useAuthStore } from '@/store/auth-store';
import { DashboardBanner } from '../components/dashboard-banner';
import { DashboardKpiGrid } from '../components/kpi-cards/dashboard-kpi-grid';
import { DashboardChartsGrid } from '../components/charts/dashboard-charts-grid';
import { DashboardActivityFeed } from '../components/dashboard-activity-feed';

export const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <DashboardBanner userName={user?.name} />
      <DashboardKpiGrid />
      <DashboardChartsGrid />
      <DashboardActivityFeed />
    </div>
  );
};
