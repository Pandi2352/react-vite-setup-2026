import React from 'react';
import { ServerCrash, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-full bg-rose-500/10 text-rose-500">
        <ServerCrash className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">500 - Internal Server Error</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        Our backend servers encountered an unexpected error while processing your request. Please try again later.
      </p>
      <Button variant="primary" onClick={() => window.location.reload()} leftIcon={<RotateCcw className="h-4 w-4" />}>
        Reload Page
      </Button>
    </div>
  );
};
