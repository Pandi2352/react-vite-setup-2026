import React from 'react';
import { Loader2 } from 'lucide-react';
import { Tooltip } from './tooltip';
import { cn } from '@/lib/utils';

export type IconButtonPosition = 'top' | 'bottom' | 'left' | 'right';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  'aria-label': string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circle' | 'square';
  isLoading?: boolean;
  tooltip?: string;
  tooltipPosition?: IconButtonPosition;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      'aria-label': ariaLabel,
      variant = 'ghost',
      size = 'md',
      shape = 'rounded',
      isLoading = false,
      disabled,
      tooltip,
      tooltipPosition = 'bottom',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer shrink-0 select-none';

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-border/80 bg-card hover:bg-muted/70 hover:border-primary/40 text-foreground',
      ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
      danger: 'bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground border border-destructive/20',
    };

    const shapes = {
      rounded: 'rounded-lg',
      circle: 'rounded-full',
      square: 'rounded-none',
    };

    const sizes = {
      xs: 'h-6 w-6 p-0 text-xs [&>svg]:h-3 [&>svg]:w-3',
      sm: 'h-7 w-7 p-0 text-xs [&>svg]:h-3.5 [&>svg]:w-3.5',
      md: 'h-9 w-9 p-0 text-sm [&>svg]:h-4 [&>svg]:w-4',
      lg: 'h-10 w-10 p-0 text-base [&>svg]:h-5 [&>svg]:w-5',
    };

    const buttonElement = (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], shapes[shape], sizes[size], className)}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip content={tooltip} position={tooltipPosition}>
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  }
);

IconButton.displayName = 'IconButton';
