import React from 'react';
import { CheckCircle2, AlertTriangle, Zap, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DashboardActivityFeed: React.FC = () => {
  const auditLogs = [
    { id: 1, event: 'User Login Succeeded', user: 'arun@forgeui.com', time: '2 minutes ago', type: 'success' },
    { id: 2, event: 'Role Permission Changed', user: 'priya@forgeui.com', time: '15 minutes ago', type: 'info' },
    { id: 3, event: 'New User Account Created', user: 'ravi@forgeui.com', time: '1 hour ago', type: 'success' },
    { id: 4, event: 'Failed Password Attempt', user: 'unknown@test.com', time: '3 hours ago', type: 'warning' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Recent Audit Log */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>System Activity Audit</CardTitle>
          <CardDescription>Real-time security and user activity logs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 rounded-md border border-border bg-muted/20 text-xs"
            >
              <div className="flex items-center gap-3">
                {log.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                {log.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
                {log.type === 'info' && <Zap className="h-4 w-4 text-blue-500 shrink-0" />}
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{log.event}</span>
                  <span className="text-muted-foreground">{log.user}</span>
                </div>
              </div>
              <span className="text-muted-foreground font-mono">{log.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Status</CardTitle>
          <CardDescription>All services operational</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card">
            <span className="font-medium text-foreground">API Gateway</span>
            <Badge variant="success">99.99%</Badge>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card">
            <span className="font-medium text-foreground">Auth Service</span>
            <Badge variant="success">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card">
            <span className="font-medium text-foreground">PostgreSQL DB</span>
            <Badge variant="success">Healthy</Badge>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-md border border-border bg-card">
            <span className="font-medium text-foreground">Redis Cache</span>
            <Badge variant="success">Connected</Badge>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> SOC2 Compliant
            </span>
            <span className="font-mono">v1.0.0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
