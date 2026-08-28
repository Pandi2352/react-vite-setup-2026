import React, { useState } from 'react';
import { Download, DollarSign, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AreaChart } from '@/components/ui/chart/area-chart';
import { DonutChart } from '@/components/ui/chart/donut-chart';
import { MetricSparkline } from '@/components/ui/chart/metric-sparkline';
import { useToast } from '@/components/ui/toast';

export const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [regionFilter, setRegionFilter] = useState('all');
  const toast = useToast();

  const handleExport = () => {
    toast.success('Analytics report CSV exported successfully!');
  };

  const areaChartData = [
    { label: 'Jan', series1: 42000, series2: 38000 },
    { label: 'Feb', series1: 58000, series2: 45000 },
    { label: 'Mar', series1: 51000, series2: 50000 },
    { label: 'Apr', series1: 74000, series2: 60000 },
    { label: 'May', series1: 89000, series2: 70000 },
    { label: 'Jun', series1: 112000, series2: 85000 },
    { label: 'Jul', series1: 128400, series2: 95000 },
  ];

  const donutData = [
    { name: 'Asia Pacific (ap-south-1)', value: 4520, color: '#3b82f6' },
    { name: 'US East (us-east-1)', value: 3120, color: '#10b981' },
    { name: 'Europe (eu-central-1)', value: 2450, color: '#f59e0b' },
    { name: 'US West (us-west-2)', value: 1180, color: '#8b5cf6' },
  ];

  const productPerformance = [
    { name: 'Enterprise Cloud Instance', sales: '$48,200', growth: '+18.4%', conversion: 78, status: 'Top Rated' },
    { name: 'SAML 2.0 SSO Addon', sales: '$24,500', growth: '+12.1%', conversion: 64, status: 'Popular' },
    { name: 'Audit Compliance Package', sales: '$18,900', growth: '+9.5%', conversion: 52, status: 'Steady' },
    { name: 'Dedicated Redis Cluster', sales: '$14,200', growth: '+24.8%', conversion: 89, status: 'High Growth' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header Section with Date Range & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics & System Reports</h1>
          <p className="text-sm text-muted-foreground">Real-time revenue metrics, cloud traffic distribution, and conversion performance</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <CustomSelect
            value={timeRange}
            onChange={(val) => setTimeRange(String(val))}
            size="sm"
            className="w-36"
            options={[
              { label: 'Last 7 Days', value: '7d' },
              { label: 'Last 30 Days', value: '30d' },
              { label: 'Year to Date', value: 'ytd' },
            ]}
          />

          <CustomSelect
            value={regionFilter}
            onChange={(val) => setRegionFilter(String(val))}
            size="sm"
            className="w-44"
            options={[
              { label: 'All Cloud Regions', value: 'all' },
              { label: 'Mumbai (ap-south-1)', value: 'mumbai' },
              { label: 'N. Virginia (us-east-1)', value: 'us-east' },
            ]}
          />

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* 4 KPI Sparkline Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-500" /> MRR Revenue
              </span>
              <div className="text-2xl font-bold text-foreground">$128,400</div>
              <Badge variant="success" className="text-[10px]">+14.2% vs last month</Badge>
            </div>
            <MetricSparkline data={[42, 58, 51, 74, 89, 112, 128]} color="emerald" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-blue-500" /> Active Subscriptions
              </span>
              <div className="text-2xl font-bold text-foreground">1,240</div>
              <Badge variant="info" className="text-[10px]">+8.5% growth</Badge>
            </div>
            <MetricSparkline data={[920, 980, 1040, 1100, 1180, 1240]} color="primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <ShoppingCart className="h-3.5 w-3.5 text-violet-500" /> Avg Order Value
              </span>
              <div className="text-2xl font-bold text-foreground">$4,250</div>
              <Badge variant="default" className="text-[10px]">+3.1% stable</Badge>
            </div>
            <MetricSparkline data={[3800, 3900, 4100, 4050, 4200, 4250]} color="indigo" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-amber-500" /> Conversion SLA
              </span>
              <div className="text-2xl font-bold text-foreground">99.98%</div>
              <Badge variant="warning" className="text-[10px]">Optimal SLA</Badge>
            </div>
            <MetricSparkline data={[99.9, 99.8, 99.95, 99.92, 99.98]} color="amber" />
          </div>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <AreaChart
          title="Revenue Growth vs Financial Target"
          description="Monthly total revenue trajectories for FY 2026"
          data={areaChartData}
          series1Name="Actual Revenue ($)"
          series2Name="Budget Target ($)"
          series1Color="#3b82f6"
          series2Color="#10b981"
          className="lg:col-span-2"
        />

        <DonutChart
          title="Cloud Traffic Distribution"
          description="Active workspace users by AWS data center region"
          data={donutData}
          centerLabel="Active Users"
        />
      </div>

      {/* Top Performing Services Analytics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Enterprise Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-muted-foreground uppercase text-[10px]">
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Total Sales</th>
                  <th className="p-3">Monthly Growth</th>
                  <th className="p-3">Conversion Rate</th>
                  <th className="p-3">Status Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {productPerformance.map((prod) => (
                  <tr key={prod.name} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-semibold text-foreground">{prod.name}</td>
                    <td className="p-3 font-mono font-bold text-primary">{prod.sales}</td>
                    <td className="p-3 font-medium text-emerald-600 dark:text-emerald-400">{prod.growth}</td>
                    <td className="p-3 w-48">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${prod.conversion}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-muted-foreground">{prod.conversion}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="info">{prod.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
