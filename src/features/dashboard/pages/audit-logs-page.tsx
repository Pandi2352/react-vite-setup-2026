import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { DataTable, TableColumn } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface AuditLogItem {
  id: string;
  event: string;
  user: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'INFO';
  timestamp: string;
}

const MOCK_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-101',
    event: 'User Sign In Succeeded',
    user: 'arun@forgeui.com',
    ipAddress: '192.168.1.10',
    status: 'SUCCESS',
    timestamp: '2026-08-28 11:45:12',
  },
  {
    id: 'log-102',
    event: 'Role Permission Modified',
    user: 'priya@forgeui.com',
    ipAddress: '192.168.1.15',
    status: 'INFO',
    timestamp: '2026-08-28 11:30:05',
  },
  {
    id: 'log-103',
    event: 'API Bearer Token Generated',
    user: 'ravi@forgeui.com',
    ipAddress: '192.168.1.20',
    status: 'SUCCESS',
    timestamp: '2026-08-28 10:15:40',
  },
  {
    id: 'log-104',
    event: 'Failed Login Password Attempt',
    user: 'unknown@test.com',
    ipAddress: '45.33.22.11',
    status: 'WARNING',
    timestamp: '2026-08-28 08:50:18',
  },
  {
    id: 'log-105',
    event: 'User Profile Updated',
    user: 'admin@forgeui.com',
    ipAddress: '192.168.1.1',
    status: 'SUCCESS',
    timestamp: '2026-08-28 07:12:00',
  },
  {
    id: 'log-106',
    event: 'System Backup Created',
    user: 'system@forgeui.com',
    ipAddress: '127.0.0.1',
    status: 'INFO',
    timestamp: '2026-08-28 04:00:00',
  },
];

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>(MOCK_AUDIT_LOGS);

  const columns: TableColumn<AuditLogItem>[] = [
    {
      key: 'event',
      header: 'System Event',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2.5 font-semibold text-foreground">
          {row.status === 'SUCCESS' && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
          {row.status === 'WARNING' && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
          {row.status === 'INFO' && <Zap className="h-4 w-4 text-blue-500 shrink-0" />}
          <span>{row.event}</span>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Initiated By',
      sortable: true,
      render: (row) => <span className="font-mono text-xs text-muted-foreground">{row.user}</span>,
    },
    {
      key: 'ipAddress',
      header: 'IP Address',
      sortable: true,
      render: (row) => <Badge variant="outline">{row.ipAddress}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => {
        if (row.status === 'SUCCESS') return <Badge variant="success">Success</Badge>;
        if (row.status === 'WARNING') return <Badge variant="warning">Warning</Badge>;
        return <Badge variant="info">Info</Badge>;
      },
    },
    {
      key: 'timestamp',
      header: 'Event Timestamp',
      sortable: true,
      render: (row) => <span className="text-xs text-muted-foreground">{row.timestamp}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" /> System Audit Logs
          </h1>
          <p className="text-sm text-muted-foreground">Real-time security events, access logs, and system operations</p>
        </div>
      </div>

      <DataTable<AuditLogItem>
        columns={columns}
        data={logs}
        selectable={true}
        exportable={true}
        exportFileName="audit-logs-export"
        searchPlaceholder="Search audit logs by event, user, or IP address..."
        getRowId={(row) => row.id}
        bulkActions={(selectedRows, clearSelection) => (
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setLogs((prev) => prev.filter((item) => !selectedRows.some((s) => s.id === item.id)));
              clearSelection();
            }}
            className="h-7 text-xs"
          >
            Clear Selected Logs ({selectedRows.length})
          </Button>
        )}
      />
    </div>
  );
};
