import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useUIStore } from '@/store/ui-store';
import { Avatar } from '@/components/ui/avatar';
import { IconButton } from '@/components/ui/icon-button';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';

export const SidebarFooter: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { sidebarCollapsed } = useUIStore();

  if (!user) return null;

  return (
    <div className={cn('p-3 border-t border-border bg-card/60', sidebarCollapsed && 'p-2 flex justify-center')}>
      <div className={cn('flex items-center justify-between gap-2', sidebarCollapsed && 'justify-center w-full')}>
        <Tooltip content={sidebarCollapsed ? `${user.name} (${user.email})` : ''} position="right">
          <div className="flex items-center gap-2.5 min-w-0 justify-center">
            <Avatar name={user.name} size="sm" className="shrink-0" />
            {!sidebarCollapsed && (
              <div className="flex flex-col text-left leading-tight truncate">
                <span className="text-xs font-semibold text-foreground truncate">{user.name}</span>
                <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>
              </div>
            )}
          </div>
        </Tooltip>

        {!sidebarCollapsed && (
          <IconButton
            icon={<LogOut className="h-4 w-4" />}
            aria-label="Sign Out"
            tooltip="Sign Out"
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-destructive"
          />
        )}
      </div>
    </div>
  );
};
