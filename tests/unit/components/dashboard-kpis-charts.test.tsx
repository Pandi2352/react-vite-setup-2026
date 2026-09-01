import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardKpiGrid } from '@/features/dashboard/components/kpi-cards/dashboard-kpi-grid';
import { DashboardChartsGrid } from '@/features/dashboard/components/charts/dashboard-charts-grid';

describe('Dashboard 10 KPI Cards & 10 Charts Suite', () => {
  it('renders all 10 KPI metric count cards with values', () => {
    render(<DashboardKpiGrid />);

    expect(screen.getByText('Total Active Users')).toBeInTheDocument();
    expect(screen.getByText('148,290')).toBeInTheDocument();

    expect(screen.getByText('API Throughput')).toBeInTheDocument();
    expect(screen.getByText('8.42M')).toBeInTheDocument();

    expect(screen.getByText('Monthly Recurring (MRR)')).toBeInTheDocument();
    expect(screen.getByText('$128,450')).toBeInTheDocument();

    expect(screen.getByText('Security Health Index')).toBeInTheDocument();
    expect(screen.getByText('Edge CDN Cache Hit')).toBeInTheDocument();
    expect(screen.getByText('P99 Server Latency')).toBeInTheDocument();
    expect(screen.getByText('Cloud Data Storage')).toBeInTheDocument();
    expect(screen.getByText('CI/CD Deployments')).toBeInTheDocument();
    expect(screen.getByText('AI Copilot Inferences')).toBeInTheDocument();
    expect(screen.getByText('High Availability SLA')).toBeInTheDocument();
  });

  it('filters KPI cards by category tab', () => {
    render(<DashboardKpiGrid />);
    const securityTab = screen.getByRole('button', { name: /security & uptime/i });
    fireEvent.click(securityTab);

    expect(screen.getByText('Security Health Index')).toBeInTheDocument();
    expect(screen.getByText('High Availability SLA')).toBeInTheDocument();
    expect(screen.queryByText('Monthly Recurring (MRR)')).not.toBeInTheDocument();
  });

  it('renders all 10 colorful charts on the dashboard', () => {
    render(<DashboardChartsGrid />);

    expect(screen.getByText('1. Revenue & Profit Spline Wave')).toBeInTheDocument();
    expect(screen.getByText('2. Network Traffic Ingress & Egress')).toBeInTheDocument();
    expect(screen.getByText('3. Cloud Storage & Data Allocation')).toBeInTheDocument();
    expect(screen.getByText('4. Live Real-Time Event Stream')).toBeInTheDocument();
    expect(screen.getByText('5. 5-Axis Security & Threat Radar')).toBeInTheDocument();
    expect(screen.getByText('6. Stacked Layered Resource Capacity')).toBeInTheDocument();
    expect(screen.getByText('7. Global Edge Latency Heatmap')).toBeInTheDocument();
    expect(screen.getByText('8. User Conversion Funnel Waterfall')).toBeInTheDocument();
    expect(screen.getByText('9. Polar Area Client Distribution')).toBeInTheDocument();
    expect(screen.getByText('10. API Latency Distribution Histogram')).toBeInTheDocument();
  });

  it('filters charts when switching category tabs', () => {
    render(<DashboardChartsGrid />);
    const financialTab = screen.getByRole('button', { name: /financial & growth/i });
    fireEvent.click(financialTab);

    expect(screen.getByText('1. Revenue & Profit Spline Wave')).toBeInTheDocument();
    expect(screen.getByText('8. User Conversion Funnel Waterfall')).toBeInTheDocument();
    expect(screen.queryByText('3. Cloud Storage & Data Allocation')).not.toBeInTheDocument();
  });
});
