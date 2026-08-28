import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface DashboardBannerProps {
  userName?: string;
}

export const DashboardBanner: React.FC<DashboardBannerProps> = ({ userName }) => {
  return (
    <div className="rounded-md border border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {userName || 'Administrator'}! 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Here is what is happening across your ForgeUI platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/users">
            <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
              View Active Users
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
