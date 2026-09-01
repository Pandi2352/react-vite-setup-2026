import React, { useState } from 'react';
import { AuditLogEntry } from '../types/audit.types';
import {
  X,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Activity,
  Globe,
  Clock,
  User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';

interface AuditDetailDialogProps {
  log: AuditLogEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AuditDetailDialog: React.FC<AuditDetailDialogProps> = ({
  log,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'diff' | 'raw'>('diff');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !log) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReceipt = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(log, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `audit_receipt_${log.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Crisp dark backdrop */}
      <div
        className="fixed inset-0 bg-background/80 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Modal */}
      <div className="relative w-full max-w-3xl rounded-2xl border border-border/80 bg-card p-6 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-muted-foreground">{log.id}</span>
              {log.status === 'SUCCEEDED' && <Badge variant="success">Succeeded</Badge>}
              {log.status === 'BLOCKED' && <Badge variant="danger">Blocked at Edge</Badge>}
              {log.status === 'FAILED' && <Badge variant="danger">Failed</Badge>}
              {log.severity === 'CRITICAL' && <Badge variant="danger">Critical</Badge>}
              {log.severity === 'WARNING' && <Badge variant="warning">Warning</Badge>}
              {log.severity === 'INFO' && <Badge variant="info">Info</Badge>}
            </div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">{log.title}</h2>
            <p className="text-xs text-muted-foreground">{log.description}</p>
          </div>

          <IconButton
            icon={<X className="h-4 w-4" />}
            aria-label="Close audit inspection dialog"
            tooltip="Close"
            variant="ghost"
            size="sm"
            onClick={onClose}
          />
        </div>

        {/* 4-Chip Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Actor */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase">
              <User className="h-3 w-3 text-primary" /> Actor / Principal
            </div>
            <p className="text-xs font-bold text-foreground mt-1 truncate">{log.actor.name}</p>
            <p className="text-[10px] font-mono text-muted-foreground truncate">{log.actor.email}</p>
          </div>

          {/* Location & IP */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase">
              <Globe className="h-3 w-3 text-blue-500" /> Client Geolocation
            </div>
            <p className="text-xs font-bold text-foreground mt-1 truncate">
              {log.geoLocation.flag} {log.geoLocation.city}, {log.geoLocation.countryCode}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground">{log.ipAddress}</p>
          </div>

          {/* Timestamp & Latency */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase">
              <Clock className="h-3 w-3 text-amber-500" /> Timing & SLA
            </div>
            <p className="text-xs font-bold text-foreground mt-1">{log.durationMs} ms latency</p>
            <p className="text-[10px] text-muted-foreground truncate">{log.formattedTime}</p>
          </div>

          {/* Target Resource */}
          <div className="p-2.5 rounded-xl border border-border/60 bg-muted/20">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground uppercase">
              <Activity className="h-3 w-3 text-emerald-500" /> Target Resource
            </div>
            <p className="text-xs font-bold text-foreground mt-1 truncate">{log.resource.name}</p>
            <p className="text-[10px] font-mono text-muted-foreground truncate">{log.resource.type}</p>
          </div>
        </div>

        {/* SHA-256 Integrity Seal */}
        <div className="p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <div>
              <span className="font-semibold text-foreground text-[11px] block">
                Cryptographically Immutable Audit Trail
              </span>
              <span className="font-mono text-[10px] text-muted-foreground break-all">
                SHA-256: {log.hashSha256}
              </span>
            </div>
          </div>
          <Badge variant="success" className="text-[9px] font-mono shrink-0">
            Verified
          </Badge>
        </div>

        {/* Tabs: Visual Diff vs Raw JSON */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/60 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('diff')}
                className={cn(
                  'px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer',
                  activeTab === 'diff'
                    ? 'bg-card text-foreground font-bold shadow-2xs'
                    : 'text-muted-foreground'
                )}
              >
                Visual State Diff
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('raw')}
                className={cn(
                  'px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer',
                  activeTab === 'raw'
                    ? 'bg-card text-foreground font-bold shadow-2xs'
                    : 'text-muted-foreground'
                )}
              >
                Raw Event Payload
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyJson}
                className="h-7 text-xs"
              >
                {copied ? <Check className="h-3 w-3 mr-1 text-emerald-500" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? 'Copied' : 'Copy JSON'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadReceipt}
                className="h-7 text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Export Receipt
              </Button>
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'diff' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Before State */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block">
                  State Before Change (Initial)
                </span>
                <pre className="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-foreground font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {log.diff?.before
                    ? JSON.stringify(log.diff.before, null, 2)
                    : '// No prior state (Entity created / Read action)'}
                </pre>
              </div>

              {/* After State */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block">
                  State After Change (Applied)
                </span>
                <pre className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-foreground font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {log.diff?.after
                    ? JSON.stringify(log.diff.after, null, 2)
                    : '// No modified properties'}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'raw' && (
            <pre className="p-3.5 rounded-xl border border-border/80 bg-muted/20 text-foreground font-mono text-xs overflow-x-auto max-h-56 leading-relaxed">
              {JSON.stringify(log, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Inspector
          </Button>
        </div>
      </div>
    </div>
  );
};
