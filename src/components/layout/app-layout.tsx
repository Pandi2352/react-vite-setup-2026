import React from 'react';
import { Outlet } from 'react-router-dom';
import { useUIStore, COLLAPSED_SIDEBAR_WIDTH } from '@/store/ui-store';
import { cn } from '@/lib/utils';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar';
import { RightIconSidebar, RightPanelDrawer } from './right-sidebar';
import { Breadcrumbs } from './navbar/breadcrumbs';
import { CommandPalette } from './navbar/command-palette';

export const AppLayout: React.FC = () => {
  const { sidebarWidth, sidebarCollapsed, isResizing } = useUIStore();

  const desktopWidth = sidebarCollapsed ? COLLAPSED_SIDEBAR_WIDTH : sidebarWidth;

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-background text-foreground flex"
      style={
        {
          '--sidebar-width': `${desktopWidth}px`,
        } as React.CSSProperties
      }
    >
      {/* Accessible Skip-to-Content Link for Screen Readers and Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-ring font-medium text-xs transition-all"
      >
        Skip to main content
      </a>

      {/* Left Resizable App Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={cn(
          'flex-1 flex flex-col h-screen min-w-0 md:pl-[var(--sidebar-width)] overflow-hidden',
          isResizing ? 'transition-none' : 'transition-[padding] duration-300 ease-in-out'
        )}
      >
        <Navbar />
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className="flex-1 overflow-y-auto p-4 md:p-6 w-full space-y-4 focus:outline-none"
        >
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      {/* Unified Right Resizable Drawer (Chatbox, MCP Tools, or Theme Engine) */}
      <RightPanelDrawer />

      {/* Right Compact 48px Icon Dock (Activity Bar) */}
      <RightIconSidebar />

      {/* Cmd+K Command Palette Modal */}
      <CommandPalette />
    </div>
  );
};
