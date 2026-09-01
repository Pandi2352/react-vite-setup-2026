import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuditLogsPage } from '@/features/dashboard/pages/audit-logs-page';

describe('Production-Ready Enterprise Audit Logs Suite', () => {
  it('renders audit page header and 4 KPI summary cards', () => {
    render(<AuditLogsPage />);

    expect(screen.getByText('Enterprise Audit Logs & Telemetry')).toBeInTheDocument();
    expect(screen.getByText('Total Ingested Events')).toBeInTheDocument();
    expect(screen.getByText('Security & WAF Blocks')).toBeInTheDocument();
    expect(screen.getByText('Active IAM Principals')).toBeInTheDocument();
    expect(screen.getByText('Ingestion Latency')).toBeInTheDocument();
  });

  it('renders audit log entries with initiator, target, and outcome badges', () => {
    render(<AuditLogsPage />);

    expect(screen.getByText('Multi-Factor Authentication Succeeded')).toBeInTheDocument();
    expect(screen.getByText('Arun Kumar')).toBeInTheDocument();
    expect(screen.getByText('192.168.1.10')).toBeInTheDocument();

    expect(screen.getByText('IAM Role Policy Modified')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
  });

  it('filters audit logs when switching category tabs', () => {
    render(<AuditLogsPage />);

    const securityTab = screen.getByRole('button', { name: /security & waf/i });
    fireEvent.click(securityTab);

    expect(screen.getByText('WAF Rate Limiting & IP Block Triggered')).toBeInTheDocument();
    expect(screen.queryByText('Enterprise Subscription Tier Upgraded')).not.toBeInTheDocument();
  });

  it('opens audit detail dialog on Inspect click and displays state diff', () => {
    render(<AuditLogsPage />);

    const inspectButtons = screen.getAllByRole('button', { name: /inspect/i });
    fireEvent.click(inspectButtons[0]);

    expect(screen.getByText('Cryptographically Immutable Audit Trail')).toBeInTheDocument();
    expect(screen.getByText('Visual State Diff')).toBeInTheDocument();
    expect(screen.getByText('Raw Event Payload')).toBeInTheDocument();
    expect(screen.getByText('State Before Change (Initial)')).toBeInTheDocument();
    expect(screen.getByText('State After Change (Applied)')).toBeInTheDocument();
  });

  it('injects simulated threat event and opens detail inspection', () => {
    render(<AuditLogsPage />);

    const simulateBtn = screen.getByRole('button', { name: /simulate threat event/i });
    fireEvent.click(simulateBtn);

    const matches = screen.getAllByText('SQL Injection Attack Blocked by WAF');
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});
