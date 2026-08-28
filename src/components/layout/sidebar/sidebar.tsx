import React, { useEffect } from 'react';
import { useUIStore } from '@/store/ui-store';
import { navigationConfig } from '@/config/navigation';
import { SidebarHeader } from './sidebar-header';
import { SidebarSection } from './sidebar-section';
import { SidebarMenuItem } from './sidebar-menu-item';
import { SidebarFooter } from './sidebar-footer';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, mobileDrawerOpen, setMobileDrawerOpen } = useUIStore();

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
    <div className="flex flex-col h-full bg-card text-card-foreground">
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

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 z-40 h-screen border-r border-border transition-all duration-300',
          sidebarCollapsed ? 'w-16' : 'w-56'
        )}
      >
        {navContent}
      </aside>

      {/* Mobile Responsive Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Container */}
          <aside className="relative z-50 w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
};
