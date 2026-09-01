import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AuditComplianceFooter: React.FC = () => {
  return (
    <div className="p-4 rounded-xl border border-border/80 bg-card/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-foreground">Enterprise Compliance & Regulatory Integrity</h4>
            <Badge variant="success" className="text-[9px] font-mono px-1.5 py-0">
              Active WORM Storage
            </Badge>
          </div>
          <p className="text-muted-foreground text-[11px] mt-0.5">
            Logs are write-once-read-many (WORM) preserved, encrypted at rest with AES-256 GCM, and audited for SOC2 Type II, HIPAA, and GDPR compliance.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 flex-wrap">
        <span className="px-2 py-1 rounded-md border border-border/60 bg-muted/40 font-mono text-[10px] font-bold text-foreground">
          SOC 2 Type II
        </span>
        <span className="px-2 py-1 rounded-md border border-border/60 bg-muted/40 font-mono text-[10px] font-bold text-foreground">
          HIPAA Ready
        </span>
        <span className="px-2 py-1 rounded-md border border-border/60 bg-muted/40 font-mono text-[10px] font-bold text-foreground">
          GDPR Art. 30
        </span>
        <span className="px-2 py-1 rounded-md border border-border/60 bg-muted/40 font-mono text-[10px] font-bold text-foreground">
          ISO/IEC 27001
        </span>
      </div>
    </div>
  );
};
