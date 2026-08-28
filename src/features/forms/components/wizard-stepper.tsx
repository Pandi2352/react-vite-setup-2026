import React from 'react';
import { CheckCircle2, Building2, Shield, Calendar as CalendarIcon } from 'lucide-react';

export interface WizardStepConfig {
  id: number;
  name: string;
  icon: React.ReactNode;
}

export const WIZARD_STEPS: WizardStepConfig[] = [
  { id: 1, name: 'Organization', icon: <Building2 className="h-4 w-4" /> },
  { id: 2, name: 'License & Access', icon: <Shield className="h-4 w-4" /> },
  { id: 3, name: 'Deployment', icon: <CalendarIcon className="h-4 w-4" /> },
  { id: 4, name: 'Review & Confirm', icon: <CheckCircle2 className="h-4 w-4" /> },
];

export interface WizardStepperProps {
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="rounded-md border border-border bg-card p-4 shadow-xs">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {WIZARD_STEPS.map((s) => {
          const isCompleted = currentStep > s.id;
          const isCurrent = currentStep === s.id;
          return (
            <div
              key={s.id}
              onClick={() => isCompleted && onStepClick(s.id)}
              className={`flex items-center gap-2.5 p-2.5 rounded-md border transition-all select-none ${
                isCurrent
                  ? 'border-primary bg-primary/10 font-bold text-primary'
                  : isCompleted
                  ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 cursor-pointer'
                  : 'border-border bg-card text-muted-foreground opacity-60'
              }`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : s.id}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs truncate font-semibold">{s.name}</span>
                <span className="text-[10px] opacity-75 truncate">
                  {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
