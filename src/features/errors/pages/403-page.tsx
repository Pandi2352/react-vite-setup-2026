import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-full bg-amber-500/10 text-amber-500">
        <ShieldAlert className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">403 - Access Forbidden</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        You do not have permission to access this resource or page. Please contact your system administrator if you believe this is an error.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Safety
        </Button>
      </Link>
    </div>
  );
};
