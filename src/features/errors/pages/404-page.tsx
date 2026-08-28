import React from 'react';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-full bg-primary/10 text-primary">
        <FileQuestion className="h-12 w-12" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">404 - Page Not Found</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
