import React from 'react';
import { Flame } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const SidebarHeader: React.FC = () => {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className={cn('flex h-16 items-center px-3.5 border-b border-border', sidebarCollapsed && 'justify-center px-0')}>
      <div className="flex items-center gap-3 overflow-hidden">
        <Tooltip content={sidebarCollapsed ? 'ForgeUI Platform' : ''} position="right">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-md font-bold">
            <Flame className="h-5 w-5" />
          </div>
        </Tooltip>
        {!sidebarCollapsed && (
          <span className="text-lg font-bold tracking-tight text-foreground truncate animate-in fade-in">
            ForgeUI
          </span>
        )}
      </div>
    </div>
  );
};
