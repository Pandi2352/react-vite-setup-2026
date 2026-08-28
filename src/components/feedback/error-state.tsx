import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load data',
  description = 'An error occurred while fetching information from the server.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5">
      <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-3">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-xs mt-1 mb-4">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
          Retry
        </Button>
      )}
    </div>
  );
};
