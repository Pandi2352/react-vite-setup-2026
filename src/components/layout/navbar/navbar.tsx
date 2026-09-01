import React from 'react';
import { Search, Command, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { MobileMenuButton } from './mobile-menu-button';
import { NotificationMenu } from './notification-menu';
import { UserMenu } from './user-menu';
import { LiveClock } from '@/components/common/clock';
import { LiveLocation } from '@/components/common/location';
import { Tooltip } from '@/components/ui/tooltip';

export const Navbar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebarCollapsed, toggleCommandPalette } = useUIStore();

  return (
    <header role="banner" className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-4 md:px-6 backdrop-blur-md">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Desktop Sidebar Collapse Toggle */}
        <Tooltip content={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} position="bottom">
          <button
            type="button"
            onClick={toggleSidebarCollapsed}
            className="hidden md:flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
        </Tooltip>

        <MobileMenuButton />
      </div>

      {/* Center Search Trigger */}
      <div className="flex-1 max-w-sm mx-4 hidden md:block">
        <Tooltip content="Quick Search (Cmd+K)" position="bottom" className="w-full">
          <button
            onClick={toggleCommandPalette}
            className="group flex h-9 w-full items-center justify-between rounded-md border border-input bg-card px-3 text-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 transition-colors group-hover:text-primary" />
              <span className="transition-colors group-hover:text-primary">Search modules, commands, & pages...</span>
            </div>
            <kbd className="flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground border border-border">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </Tooltip>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Free Live Geolocation & Weather */}
        <div className="hidden lg:flex items-center">
          <LiveLocation />
        </div>

        {/* Live Clock with Global Timezone Region Switcher */}
        <div className="hidden sm:flex items-center">
          <LiveClock />
        </div>

        <Tooltip content="Global Search" position="bottom">
          <button
            onClick={toggleCommandPalette}
            className="md:hidden h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </Tooltip>

        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
};
