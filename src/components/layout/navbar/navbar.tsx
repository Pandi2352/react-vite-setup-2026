import React from 'react';
import { Search, Command, PanelLeftClose, PanelLeftOpen, Palette } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { useTheme } from '@/hooks/useTheme';
import { MobileMenuButton } from './mobile-menu-button';
import { NotificationMenu } from './notification-menu';
import { UserMenu } from './user-menu';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export const Navbar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebarCollapsed, toggleCommandPalette } = useUIStore();
  const { toggleCustomizer } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-4 md:px-6 backdrop-blur-md">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Desktop Sidebar Collapse Toggle */}
        <Tooltip content={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'} position="bottom">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebarCollapsed}
            className="hidden md:flex h-9 w-9 p-0 text-muted-foreground hover:text-foreground"
            aria-label={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </Button>
        </Tooltip>

        <MobileMenuButton />
      </div>

      {/* Center Search Trigger */}
      <div className="flex-1 max-w-sm mx-4 hidden md:block">
        <Tooltip content="Quick Search (Cmd+K)" position="bottom" className="w-full">
          <button
            onClick={toggleCommandPalette}
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-card px-3 text-xs text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Search modules, commands, & pages...</span>
            </div>
            <kbd className="flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground border border-border">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </Tooltip>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Tooltip content="Global Search" position="bottom">
          <button
            onClick={toggleCommandPalette}
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </Tooltip>

        {/* Palette Icon to open Right Customizer Drawer */}
        <Tooltip content="Theme & Font Customizer (30 Schemes, 20 Fonts)" position="bottom">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCustomizer}
            className="h-9 w-9 p-0 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Open Theme Customizer"
          >
            <Palette className="h-4 w-4 text-primary" />
          </Button>
        </Tooltip>

        <ThemeToggle />
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
};
