import React from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertCircle } from 'lucide-react';

export interface RadioOption<T = string> {
  value: T;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface RadioGroupProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  label?: string;
  required?: boolean;
  error?: string;
  name?: string;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function RadioGroup<T extends string = string>({
  value,
  onChange,
  options,
  label,
  required,
  error,
  columns = 2,
  className,
}: RadioGroupProps<T>) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-4',
  };

  return (
    <div className={cn('space-y-1.5 w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive font-bold ml-1">*</span>}
        </label>
      )}
      <div className={cn('grid gap-3', colClasses[columns])}>
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <div
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                'relative flex cursor-pointer rounded-md border p-4 shadow-xs transition-all select-none',
                isSelected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary'
                  : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30',
                error && 'border-destructive bg-destructive/5'
              )}
            >
              <div className="flex w-full items-start gap-3">
                {opt.icon && <div className="mt-0.5 text-primary shrink-0">{opt.icon}</div>}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-foreground">{opt.title}</span>
                    {opt.badge && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  {opt.description && (
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {opt.description}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5',
                    isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'
                  )}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1 animate-in fade-in">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
