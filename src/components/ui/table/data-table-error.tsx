import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../button';

export interface DataTableErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const DataTableError: React.FC<DataTableErrorProps> = ({
  message = 'Unable to load table data due to a network error.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center text-xs">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-3">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-bold text-foreground">Data Load Error</h3>
      <p className="text-muted-foreground mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-4"
          leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
        >
          Retry Connection
        </Button>
      )}
    </div>
  );
};
