import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC<{ label?: string }> = ({ label = 'Loading application...' }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 p-6">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">{label}</p>
    </div>
  );
};
