import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { WizardFormData } from '../schemas/wizard.schema';

export interface StepReviewProps {
  values: WizardFormData;
}

export const StepReview: React.FC<StepReviewProps> = ({ values }) => {
  return (
    <div className="space-y-4 animate-in fade-in">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Step 4: Summary Review
      </h2>

      <div className="rounded-md border border-border bg-muted/20 p-4 space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-2 border-b border-border/60 pb-3">
          <div>
            <span className="text-muted-foreground block">Organization Name:</span>
            <strong className="text-foreground text-sm">{values.orgName}</strong>
          </div>
          <div>
            <span className="text-muted-foreground block">Admin Email:</span>
            <strong className="text-foreground text-sm">{values.orgEmail}</strong>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-b border-border/60 pb-3">
          <div>
            <span className="text-muted-foreground block">Subscription Tier:</span>
            <strong className="text-primary font-bold">{values.planTier}</strong>
          </div>
          <div>
            <span className="text-muted-foreground block">User Capacity:</span>
            <strong className="text-foreground">{values.userSlots} Slots</strong>
          </div>
          <div>
            <span className="text-muted-foreground block">Target Go-Live:</span>
            <strong className="text-foreground">{values.startDate}</strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-muted-foreground block">Cloud Region:</span>
            <strong className="text-foreground">{values.region}</strong>
          </div>
          <div>
            <span className="text-muted-foreground block">Security Addons:</span>
            <strong className="text-emerald-600 dark:text-emerald-400">
              {[values.enableAuditLogs && 'Audit Logs', values.enableSSO && 'SSO Auth']
                .filter(Boolean)
                .join(' • ') || 'None'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
