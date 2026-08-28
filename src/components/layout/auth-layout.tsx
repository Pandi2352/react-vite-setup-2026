import React from 'react';
import { Outlet } from 'react-router-dom';
import { Flame } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg font-bold">
            <Flame className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">ForgeUI Starter</h1>
          <p className="text-sm text-muted-foreground">Production Frontend Engineering Boilerplate</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-xl">
          <Outlet />
        </div>

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} ForgeUI Starter Template. Built with React & Vite.
        </p>
      </div>
    </div>
  );
};
