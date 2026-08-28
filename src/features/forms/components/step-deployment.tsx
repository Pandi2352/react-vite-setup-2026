import React from 'react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';
import { WizardFormData } from '../schemas/wizard.schema';
import { DatePicker } from '@/components/ui/date-picker';
import { CustomSelect } from '@/components/ui/select';

export interface StepDeploymentProps {
  errors: FieldErrors<WizardFormData>;
  values: WizardFormData;
  setValue: UseFormSetValue<WizardFormData>;
}

export const StepDeployment: React.FC<StepDeploymentProps> = ({ errors, values, setValue }) => {
  const regionOptions = [
    { label: 'Asia Pacific (Mumbai - ap-south-1)', value: 'ap-south-1' },
    { label: 'US East (N. Virginia - us-east-1)', value: 'us-east-1' },
    { label: 'Europe (Frankfurt - eu-central-1)', value: 'eu-central-1' },
    { label: 'Asia Pacific (Singapore - ap-southeast-1)', value: 'ap-southeast-1' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in">
      <h2 className="text-base font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
        <CalendarIcon className="h-5 w-5 text-primary" /> Step 3: Deployment & Region Setup
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label="Target Go-Live Date"
          required={true}
          value={values.startDate}
          onChange={(date) => setValue('startDate', date)}
          error={errors.startDate?.message}
        />

        <CustomSelect
          label="Primary Cloud Data Region"
          required={true}
          value={values.region}
          onChange={(val) => setValue('region', String(val))}
          options={regionOptions}
          error={errors.region?.message}
        />
      </div>
    </div>
  );
};
