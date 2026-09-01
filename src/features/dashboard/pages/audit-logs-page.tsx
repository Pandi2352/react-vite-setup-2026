import React, { useState, useEffect } from 'react';
import {
  AuditLogEntry,
  INITIAL_AUDIT_LOGS,
  AuditKpiSummary,
  AuditFiltersToolbar,
  AuditDetailDialog,
  AuditComplianceFooter,
} from '@/features/audit';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [inspectingLog, setInspectingLog] = useState<AuditLogEntry | null>(null);

  // Live Stream Simulation: Append synthetic event every 12 seconds when streaming is ON
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const sampleEvents = [
        {
          action: 'AUTH_SESSION_HEARTBEAT',
          title: 'Session Token Refreshed',
          description: 'Client session token renewed via OAuth2 refresh rotation.',
          category: 'AUTH' as const,
          severity: 'SUCCESS' as const,
          status: 'SUCCEEDED' as const,
          actor: {
            id: 'usr_arun_101',
            name: 'Arun Kumar',
            email: 'arun@forgeui.com',
            role: 'Super Administrator',
          },
          resource: { type: 'Session', id: `sess_${Date.now()}`, name: 'OAuth2 Refresh Token' },
          ipAddress: '192.168.1.10',
          geoLocation: { city: 'Bengaluru', country: 'India', countryCode: 'IN', flag: '🇮🇳' },
          userAgent: 'Chrome 128 (macOS)',
          durationMs: Math.floor(8 + Math.random() * 12),
          hashSha256: `sha256_${Math.random().toString(36).substring(2, 15)}`,
          diff: { before: { status: 'EXPIRED' }, after: { status: 'ACTIVE', ttl: '1h' } },
        },
        {
          action: 'API_GRAPHQL_QUERY_EXECUTED',
          title: 'GraphQL High-Frequency Query',
          description: 'Queried tenant analytics metrics with scoped developer access.',
          category: 'API' as const,
          severity: 'INFO' as const,
          status: 'SUCCEEDED' as const,
          actor: {
            id: 'usr_priya_102',
            name: 'Priya Sharma',
            email: 'priya@forgeui.com',
            role: 'Security Officer',
          },
          resource: { type: 'GraphQLQuery', id: 'gql_metrics_batch', name: 'batchMetricsQuery' },
          ipAddress: '192.168.1.15',
          geoLocation: { city: 'Frankfurt', country: 'Germany', countryCode: 'DE', flag: '🇩🇪' },
          userAgent: 'ApolloClient/3.8',
          durationMs: Math.floor(18 + Math.random() * 25),
          hashSha256: `sha256_${Math.random().toString(36).substring(2, 15)}`,
          diff: { before: {}, after: { query_cost: 14 } },
        },
      ];

      const chosen = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const newEntry: AuditLogEntry = {
        ...chosen,
        id: `aud_${Math.random().toString(36).substring(2, 10)}`,
        timestamp: new Date().toISOString(),
        formattedTime: new Date().toUTCString().replace('GMT', 'UTC'),
      };

      setLogs((prev) => [newEntry, ...prev.slice(0, 40)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Simulate Threat Event Handler
  const handleSimulateThreatEvent = () => {
    const threatEntry: AuditLogEntry = {
      id: `aud_threat_${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      formattedTime: new Date().toUTCString().replace('GMT', 'UTC'),
      action: 'SECURITY_SQL_INJECTION_BLOCKED',
      title: 'SQL Injection Attack Blocked by WAF',
      description: "Malicious payload ' OR 1=1; -- intercepted in /api/v1/search parameter.",
      category: 'SECURITY',
      severity: 'CRITICAL',
      status: 'BLOCKED',
      actor: {
        id: 'usr_adversary_net',
        name: 'Adversary Botnet Node',
        email: 'attacker@dark_relay.cc',
        role: 'Malicious Actor',
        isSystemBot: true,
      },
      resource: {
        type: 'SQLEndpoint',
        id: 'ep_search_v1',
        name: '/api/v1/search',
      },
      ipAddress: '185.220.101.5',
      geoLocation: {
        city: 'Amsterdam',
        country: 'Netherlands',
        countryCode: 'NL',
        flag: '🇳🇱',
      },
      userAgent: 'sqlmap/1.8.4#stable',
      durationMs: 1,
      hashSha256: `sha256_attack_${Math.random().toString(36).substring(2, 12)}`,
      diff: {
        before: { waf_action: 'INSPECTING' },
        after: { waf_action: 'BLOCKED_403_FORBIDDEN', rule: 'CRS_RULE_942100' },
      },
    };

    setLogs((prev) => [threatEntry, ...prev]);
    setInspectingLog(threatEntry); // Automatically open dialog for immediate inspection
  };

  // Filter logs based on category and severity
  const filteredLogs = logs.filter((log) => {
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'AUTH_IAM' && log.category !== 'AUTH' && log.category !== 'IAM') {
        return false;
      }
      if (selectedCategory === 'SECURITY' && log.category !== 'SECURITY') {
        return false;
      }
      if (selectedCategory === 'DATABASE_SYSTEM' && log.category !== 'DATABASE' && log.category !== 'SYSTEM') {
        return false;
      }
      if (selectedCategory === 'BILLING_API' && log.category !== 'BILLING' && log.category !== 'API') {
        return false;
      }
    }

    if (selectedSeverity !== 'ALL' && log.severity !== selectedSeverity) {
      return false;
    }

    return true;
  });

  // Table Columns Definition
  const columns: TableColumn<AuditLogEntry>[] = [
    {
      key: 'formattedTime',
      header: 'Timestamp (UTC)',
      sortable: true,
      render: (row) => (
        <div className="space-y-0.5 font-mono text-[11px]">
          <span className="text-foreground font-semibold block">{row.formattedTime}</span>
          <span className="text-[10px] text-muted-foreground">{row.durationMs}ms latency</span>
        </div>
      ),
    },
    {
      key: 'title',
      header: 'Event & Action',
      sortable: true,
      render: (row) => (
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 shrink-0">
            {row.severity === 'CRITICAL' && <ShieldAlert className="h-4 w-4 text-rose-500" />}
            {row.severity === 'WARNING' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
            {row.severity === 'INFO' && <Zap className="h-4 w-4 text-blue-500" />}
            {row.severity === 'SUCCESS' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground text-xs">{row.title}</span>
              <span className="text-[9px] font-mono px-1 rounded-sm bg-muted/60 text-muted-foreground border border-border/40">
                {row.category}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate max-w-[280px]">
              {row.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'actor',
      header: 'Initiator / Principal',
      sortable: true,
      render: (row) => (
        <div className="space-y-0.5">
          <span className="font-bold text-foreground text-xs block truncate max-w-[140px]">
            {row.actor.name}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground block truncate max-w-[140px]">
            {row.actor.email}
          </span>
        </div>
      ),
    },
    {
      key: 'resource',
      header: 'Target Resource',
      sortable: true,
      render: (row) => (
        <div className="space-y-0.5">
          <span className="font-mono text-xs font-semibold text-foreground block truncate max-w-[130px]">
            {row.resource.name}
          </span>
          <span className="text-[10px] text-muted-foreground block">{row.resource.type}</span>
        </div>
      ),
    },
    {
      key: 'ipAddress',
      header: 'Client IP & Location',
      sortable: true,
      render: (row) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
            <span>{row.geoLocation.flag}</span>
            <span className="truncate max-w-[100px]">{row.geoLocation.city}</span>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono px-1 py-0">
            {row.ipAddress}
          </Badge>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Outcome',
      sortable: true,
      render: (row) => {
        if (row.status === 'SUCCEEDED') return <Badge variant="success">Succeeded</Badge>;
        if (row.status === 'BLOCKED') return <Badge variant="danger">Blocked</Badge>;
        if (row.status === 'FAILED') return <Badge variant="danger">Failed</Badge>;
        return <Badge variant="warning">Pending</Badge>;
      },
    },
    {
      key: 'id',
      header: 'Actions',
      sortable: false,
      render: (row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setInspectingLog(row)}
          className="h-7 text-xs flex items-center gap-1 hover:border-primary/50"
        >
          <Eye className="h-3 w-3" />
          <span>Inspect</span>
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-foreground">
                Enterprise Audit Logs & Telemetry
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Immutable, cryptographically verified audit records and security event telemetry
              </p>
            </div>
          </div>
        </div>

        {/* Global Export Action */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const dataStr =
                'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute('href', dataStr);
              downloadAnchor.setAttribute('download', `audit_logs_full_export_${Date.now()}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="text-xs font-semibold"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export Compliance JSON
          </Button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <AuditKpiSummary logs={logs} />

      {/* Multi-Criteria Filters Toolbar */}
      <AuditFiltersToolbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedSeverity={selectedSeverity}
        onSelectSeverity={setSelectedSeverity}
        isStreaming={isStreaming}
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
        onSimulateEvent={handleSimulateThreatEvent}
        onResetFilters={() => {
          setSelectedCategory('ALL');
          setSelectedSeverity('ALL');
        }}
      />

      {/* Reorderable & Resizable Data Grid */}
      <DataTable<AuditLogEntry>
        columns={columns}
        data={filteredLogs}
        selectable={true}
        exportable={true}
        reorderableColumns={true}
        resizableColumns={true}
        reorderableRows={true}
        exportFileName="enterprise-audit-logs-export"
        searchPlaceholder="Search audit logs by event, actor, IP, or resource..."
        getRowId={(row) => row.id}
        bulkActions={(selectedRows, clearSelection) => (
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setLogs((prev) => prev.filter((item) => !selectedRows.some((s) => s.id === item.id)));
              clearSelection();
            }}
            className="h-7 text-xs flex items-center gap-1"
          >
            <Trash2 className="h-3 w-3" />
            Clear Selected Logs ({selectedRows.length})
          </Button>
        )}
      />

      {/* Detailed Modal / Inspector */}
      <AuditDetailDialog
        log={inspectingLog}
        isOpen={Boolean(inspectingLog)}
        onClose={() => setInspectingLog(null)}
      />

      {/* Compliance & Regulatory Certification Footer */}
      <AuditComplianceFooter />
    </div>
  );
};
