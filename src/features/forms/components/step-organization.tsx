import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Building2 } from 'lucide-react';
import { WizardFormData } from '../schemas/wizard.schema';
import { Input } from '@/components/ui/input';
import { Dropzone } from '@/components/ui/dropzone';

export interface StepOrganizationProps {
  register: UseFormRegister<WizardFormData>;
  errors: FieldErrors<WizardFormData>;
  onFileSelect: (file: File | null) => void;
}

export const StepOrganization: React.FC<StepOrganizationProps> = ({
  register,
  errors,
  onFileSelect,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
        <Building2 className="h-5 w-5 text-primary" /> Step 1: Organization & Branding
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Organization Name"
          required={true}
          placeholder="e.g. Acme Corporation"
          error={errors.orgName?.message}
          {...register('orgName')}
        />
        <Input
          label="Admin Contact Email"
          required={true}
          type="email"
          placeholder="e.g. admin@acme.com"
          error={errors.orgEmail?.message}
          {...register('orgEmail')}
        />
      </div>

      <Input
        label="Official Website URL"
        required={true}
        placeholder="https://acme.com"
        error={errors.orgWebsite?.message}
        {...register('orgWebsite')}
      />

      <Dropzone
        label="Organization Logo"
        description="Upload your company logo or icon (SVG, PNG, JPG - Max 5MB)"
        onFileSelect={onFileSelect}
      />
    </div>
  );
};
