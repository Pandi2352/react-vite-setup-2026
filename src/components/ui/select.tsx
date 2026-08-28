import { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption<T = string | number> {
  label: string;
  value: T;
  icon?: ReactNode;
}

export interface CustomSelectProps<T = string | number> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function CustomSelect<T extends string | number>({
  value,
  onChange,
  options,
  label,
  required,
  error,
  placeholder = 'Select an option...',
  className,
  size = 'md',
  disabled = false,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-11 px-4 text-base',
  };

  return (
    <div ref={dropdownRef} className="space-y-1.5 w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive font-bold ml-1">*</span>}
        </label>
      )}
      <div className="relative inline-block text-left w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'flex items-center justify-between gap-2 w-full rounded-md border border-input bg-card text-foreground font-medium shadow-xs transition-colors cursor-pointer',
            'hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary',
            disabled && 'opacity-50 cursor-not-allowed',
            error && 'border-destructive focus:ring-destructive bg-destructive/5',
            sizeClasses[size],
            className
          )}
        >
          <span className="truncate flex items-center gap-2">
            {selectedOption?.icon}
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className="absolute right-0 z-50 mt-1 w-full min-w-[140px] max-h-60 overflow-auto rounded-md border border-border bg-card p-1 shadow-lg backdrop-blur-md animate-in fade-in-80 zoom-in-95">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'flex items-center justify-between w-full rounded-xs px-2.5 py-1.5 text-xs text-left cursor-pointer transition-colors select-none',
                    isSelected ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-muted'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    {opt.icon}
                    {opt.label}
                  </span>
                  {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        )}
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
