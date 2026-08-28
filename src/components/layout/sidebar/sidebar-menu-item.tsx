import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { NavItemConfig } from '@/config/navigation';
import { useUIStore } from '@/store/ui-store';
import { PermissionGuard } from '@/components/common/permission-guard';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const SidebarMenuItem: React.FC<{ item: NavItemConfig }> = ({ item }) => {
  const { sidebarCollapsed, expandedSubmenus, toggleSubmenu, setMobileDrawerOpen } = useUIStore();
  const location = useLocation();

  const isExpanded = expandedSubmenus.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;

  // Active check
  const isChildActive = hasChildren
    ? item.children?.some((child) => child.path && location.pathname === child.path)
    : false;

  const menuItemElement = (
    <div className="w-full">
      {hasChildren ? (
        <button
          onClick={() => toggleSubmenu(item.id)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-normal transition-colors cursor-pointer',
            isChildActive
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:bg-accent/80 hover:text-foreground',
            sidebarCollapsed && 'w-10 h-10 p-0 justify-center mx-auto'
          )}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-2.5 min-w-0 justify-center">
            <div className="shrink-0">{item.icon}</div>
            {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
          </div>
          {!sidebarCollapsed && (
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 shrink-0 transition-transform duration-200 text-muted-foreground',
                isExpanded && 'rotate-180 text-primary'
              )}
            />
          )}
        </button>
      ) : item.external ? (
        <a
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center justify-between px-3 py-2 rounded-md text-xs font-normal text-muted-foreground hover:bg-accent/80 hover:text-foreground transition-colors',
            sidebarCollapsed && 'w-10 h-10 p-0 justify-center mx-auto'
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0 justify-center">
            <div className="shrink-0">{item.icon}</div>
            {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
          </div>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1">
              {item.badge && (
                <Badge variant={item.badge.variant || 'default'} className="text-[9px] px-1.5 py-0">
                  {item.badge.text}
                </Badge>
              )}
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/60" />
            </div>
          )}
        </a>
      ) : (
        <NavLink
          to={item.path || '#'}
          onClick={() => setMobileDrawerOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center justify-between px-3 py-2 rounded-md text-xs transition-all duration-200',
              isActive
                ? 'bg-primary/10 text-primary font-medium shadow-2xs'
                : 'text-muted-foreground font-normal hover:bg-accent/80 hover:text-foreground',
              sidebarCollapsed && 'w-10 h-10 p-0 justify-center mx-auto'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-2.5 min-w-0 justify-center">
                <div className="shrink-0">{item.icon}</div>
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              </div>
              {!sidebarCollapsed && item.badge && (
                <Badge
                  variant={item.badge.variant || 'default'}
                  className={cn('text-[9px] px-1.5 py-0 font-normal', isActive && 'bg-primary/20 text-primary')}
                >
                  {item.badge.text}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      )}

      {/* Render Submenu Children without vertical line */}
      {hasChildren && isExpanded && !sidebarCollapsed && (
        <div className="pl-3 space-y-1 mt-1 animate-in slide-in-from-left-2">
          {item.children?.map((child) => (
            <SidebarMenuItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );

  const wrappedWithTooltip = sidebarCollapsed ? (
    <Tooltip content={item.label} position="right" className="w-full py-0.5">
      {menuItemElement}
    </Tooltip>
  ) : (
    menuItemElement
  );

  if (item.permission) {
    return <PermissionGuard permission={item.permission as any}>{wrappedWithTooltip}</PermissionGuard>;
  }

  return wrappedWithTooltip;
};
