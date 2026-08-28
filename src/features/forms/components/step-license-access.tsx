import React from 'react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Shield, Crown, Zap, Sparkles } from 'lucide-react';
import { WizardFormData } from '../schemas/wizard.schema';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup } from '@/components/ui/radio-group';

export interface StepLicenseAccessProps {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
  values: WizardFormData;
  setValue: UseFormSetValue<WizardFormData>;
}

export const StepLicenseAccess: React.FC<StepLicenseAccessProps> = ({
  register,
  errors,
  values,
  setValue,
}) => {
  const planOptions = [
    {
      value: 'ENTERPRISE',
      title: 'Enterprise Plan',
      description: 'Unlimited capacity, 99.99% SLA uptime, 24/7 dedicated engineering support.',
      icon: <Crown className="h-5 w-5" />,
      badge: 'POPULAR',
    },
    {
      value: 'PRO',
      title: 'Pro Plan',
      description: 'Up to 50 team members, advanced analytics, custom domain integration.',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      value: 'STARTER',
      title: 'Starter Plan',
      description: 'Ideal for small teams or startups getting started with ForgeUI.',
      icon: <Sparkles className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-5 animate-in fade-in">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
        <Shield className="h-5 w-5 text-primary" /> Step 2: Select Plan & Security Features
      </h2>

      <RadioGroup
        label="Select Subscription Plan"
        required={true}
        value={values.planTier}
        onChange={(val) => setValue('planTier', val as any)}
        options={planOptions}
        columns={1}
        error={errors.planTier?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <Input
          label="Allocated User Slots"
          required={true}
          type="number"
          placeholder="25"
          error={errors.userSlots?.message}
          {...register('userSlots', { valueAsNumber: true })}
        />

        <div className="space-y-4 rounded-md border border-border p-4 bg-muted/20">
          <Switch
            checked={values.enableAuditLogs}
            onChange={(checked) => setValue('enableAuditLogs', checked)}
            label="Enable Real-Time Audit Logs"
            description="Record all security events & compliance logs"
          />

          <Switch
            checked={values.enableSSO}
            onChange={(checked) => setValue('enableSSO', checked)}
            label="SAML 2.0 / OAuth SSO Single Sign-On"
            description="Integrate Okta, Google Workspace, or Azure AD"
          />
        </div>
      </div>
    </div>
  );
};
