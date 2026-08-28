import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { wizardSchema, WizardFormData } from '../schemas/wizard.schema';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

import { WizardStepper } from '../components/wizard-stepper';
import { StepOrganization } from '../components/step-organization';
import { StepLicenseAccess } from '../components/step-license-access';
import { StepDeployment } from '../components/step-deployment';
import { StepReview } from '../components/step-review';

export const MultiStepFormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [_uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      orgName: '',
      orgEmail: '',
      orgWebsite: '',
      planTier: 'ENTERPRISE',
      userSlots: 25,
      enableAuditLogs: true,
      enableSSO: true,
      startDate: new Date().toISOString().split('T')[0],
      region: 'ap-south-1',
    },
  });

  const formValues = watch();

  const validateAndNext = async () => {
    let isValid = false;
    if (currentStep === 1) isValid = await trigger(['orgName', 'orgEmail', 'orgWebsite']);
    else if (currentStep === 2) isValid = await trigger(['planTier', 'userSlots']);
    else if (currentStep === 3) isValid = await trigger(['startDate', 'region']);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    } else {
      toast.error('Please fix the validation errors before proceeding.');
    }
  };

  const handleFinalSubmit = (data: WizardFormData) => {
    toast.success(`Organization "${data.orgName}" onboarded successfully!`);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Organization Setup Wizard</h1>
        <p className="text-sm text-muted-foreground">Configure new workspace infrastructure, security quotas, and deployment schedules</p>
      </div>

      {/* Modular Stepper Header */}
      <WizardStepper currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Form Card Container */}
      <div className="rounded-md border border-border bg-card p-6 shadow-xs">
        <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <StepOrganization register={register} errors={errors} onFileSelect={setUploadedLogo} />
          )}

          {currentStep === 2 && (
            <StepLicenseAccess register={register} errors={errors} values={formValues} setValue={setValue} />
          )}

          {currentStep === 3 && (
            <StepDeployment errors={errors} values={formValues} setValue={setValue} />
          )}

          {currentStep === 4 && <StepReview values={formValues} />}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Previous Step
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                onClick={validateAndNext}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue to Step {currentStep + 1}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                leftIcon={<CheckCircle2 className="h-4 w-4" />}
              >
                Complete Onboarding
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
