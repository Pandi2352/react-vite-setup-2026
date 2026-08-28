import React from 'react';
import { Calendar as CalendarIcon, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DatePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (date: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  label,
  required,
  placeholder = 'Select date...',
  className,
  error,
}) => {
  return (
    <div className={cn('space-y-1.5 w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive font-bold ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
        </div>
        <input
          type="date"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-card pl-10 pr-3 py-2 text-sm text-foreground shadow-xs transition-colors cursor-pointer',
            'focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary',
            error && 'border-destructive focus:ring-destructive bg-destructive/5'
          )}
        />
      </div>
      {error && (
        <p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1 animate-in fade-in">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
