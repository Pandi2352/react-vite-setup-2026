import React, { useEffect } from 'react';
import { useUIStore, COLLAPSED_SIDEBAR_WIDTH } from '@/store/ui-store';
import { navigationConfig } from '@/config/navigation';
import { SidebarHeader } from './sidebar-header';
import { SidebarSection } from './sidebar-section';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarFooter } from './sidebar-footer';
import { SidebarResizeHandle } from './sidebar-resize-handle';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { sidebarWidth, sidebarCollapsed, isResizing, mobileDrawerOpen, setMobileDrawerOpen } =
    useUIStore();

  // Prevent body scrolling when mobile drawer is active
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileDrawerOpen]);

  const navContent = (
    <div className="flex flex-col h-full bg-card text-card-foreground select-none">
      <SidebarHeader />

      <nav aria-label="Sidebar Navigation" className="flex-1 overflow-y-auto custom-scrollbar px-2 py-3 space-y-1">
        {navigationConfig.map((section) => (
          <div key={section.id} className="space-y-1">
            <SidebarSection title={section.title} />
            {section.items.map((item) => (
              <SidebarMenuItem key={item.id} item={item} />
            ))}
          </div>
        ))}
      </nav>

      <SidebarFooter />
    </div>
  );

  const currentDesktopWidth = sidebarCollapsed ? COLLAPSED_SIDEBAR_WIDTH : sidebarWidth;

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        aria-label="Main Application Sidebar"
        style={{ width: `${currentDesktopWidth}px` }}
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 z-40 h-screen border-r border-border bg-card',
          isResizing ? 'transition-none' : 'transition-[width] duration-300 ease-in-out'
        )}
      >
        {navContent}
        <SidebarResizeHandle />
      </aside>

      {/* Mobile Responsive Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Mobile Navigation Menu">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <aside aria-label="Mobile Sidebar Drawer" className="relative z-50 w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};

