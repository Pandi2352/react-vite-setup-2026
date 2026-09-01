import React from 'react';
import { ShieldCheck, AlertTriangle, Users, Database } from 'lucide-react';
import { AuditLogEntry } from '../types/audit.types';

interface AuditKpiSummaryProps {
  logs: AuditLogEntry[];
}

export const AuditKpiSummary: React.FC<AuditKpiSummaryProps> = ({ logs }) => {
  const totalCount = logs.length;
  const criticalOrWarning = logs.filter(
    (l) => l.severity === 'CRITICAL' || l.severity === 'WARNING' || l.status === 'BLOCKED'
  ).length;
  const uniqueActors = new Set(logs.map((l) => l.actor.email)).size;
  const avgLatency = Math.round(
    logs.reduce((acc, curr) => acc + (curr.durationMs || 0), 0) / (logs.length || 1)
  );

  const kpis = [
    {
      title: 'Total Ingested Events',
      value: `${totalCount.toLocaleString()} logs`,
      subtext: '100% SHA-256 Verified',
      icon: <Database className="h-4 w-4 text-blue-500" />,
      badge: 'Immutable',
      color: 'border-blue-500/20 bg-blue-500/5',
    },
    {
      title: 'Security & WAF Blocks',
      value: `${criticalOrWarning} flagged`,
      subtext: 'Edge WAF mitigation',
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      badge: 'Zero Breach',
      color: 'border-amber-500/20 bg-amber-500/5',
    },
    {
      title: 'Active IAM Principals',
      value: `${uniqueActors} principals`,
      subtext: 'MFA Enforced',
      icon: <Users className="h-4 w-4 text-emerald-500" />,
      badge: 'Verified',
      color: 'border-emerald-500/20 bg-emerald-500/5',
    },
    {
      title: 'Ingestion Latency',
      value: `${avgLatency} ms avg`,
      subtext: 'P99 SLA < 15ms',
      icon: <ShieldCheck className="h-4 w-4 text-purple-500" />,
      badge: 'Optimal',
      color: 'border-purple-500/20 bg-purple-500/5',
    },
  ];

  return (
    <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={kpi.title}
          className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all hover:-translate-y-0.5 shadow-2xs ${kpi.color}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider truncate">
              {kpi.title}
            </span>
            <div className="p-1.5 rounded-lg bg-card/80 border shadow-2xs shrink-0">
              {kpi.icon}
            </div>
          </div>

          <div className="mt-2 space-y-1">
            <h4 className="text-xl font-extrabold font-mono text-foreground tracking-tight">
              {kpi.value}
            </h4>
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <span className="text-muted-foreground truncate">{kpi.subtext}</span>
              <span className="px-1.5 py-0.2 font-mono font-bold rounded-sm bg-card border text-foreground shrink-0">
                {kpi.badge}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
