import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { Breadcrumbs } from './navbar/breadcrumbs';
import { CommandPalette } from './navbar/command-palette';
import { ThemeCustomizerDrawer } from '@/components/theme';

export const AppLayout: React.FC = () => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground flex">
      <Sidebar />
      <div
        className={cn(
          'flex-1 flex flex-col h-screen min-w-0 transition-all duration-300 overflow-hidden',
          sidebarCollapsed ? 'md:pl-16' : 'md:pl-56'
        )}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full space-y-4">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      {/* Cmd+K Command Palette Modal */}
      <CommandPalette />

      {/* Right Theme & Fonts Customizer Drawer */}
      <ThemeCustomizerDrawer />
    </div>
  );
};
