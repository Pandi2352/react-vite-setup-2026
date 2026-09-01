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
          type="button"
          onClick={() => toggleSubmenu(item.id)}
          className={cn(
            'group w-full flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150 cursor-pointer',
            isChildActive
              ? 'text-primary font-semibold'
              : 'text-muted-foreground font-normal hover:text-primary',
            sidebarCollapsed && 'w-10 h-10 p-0 justify-center mx-auto'
          )}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center gap-2.5 min-w-0 justify-center">
            <div className="shrink-0 transition-transform duration-150 group-hover:scale-110">{item.icon}</div>
            {!sidebarCollapsed && <span className="truncate transition-colors">{item.label}</span>}
          </div>
          {!sidebarCollapsed && (
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 shrink-0 transition-transform duration-200',
                isExpanded ? 'rotate-180 text-primary' : 'text-muted-foreground group-hover:text-primary'
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
            'group flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150',
            'text-muted-foreground font-normal hover:text-primary',
            sidebarCollapsed && 'w-10 h-10 p-0 justify-center mx-auto'
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0 justify-center">
            <div className="shrink-0 transition-transform duration-150 group-hover:scale-110">{item.icon}</div>
            {!sidebarCollapsed && <span className="truncate transition-colors">{item.label}</span>}
          </div>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-1">
              {item.badge && (
                <Badge variant={item.badge.variant || 'default'} className="text-[9px] px-1.5 py-0">
                  {item.badge.text}
                </Badge>
              )}
              <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors" />
            </div>
          )}
        </a>
      ) : (
        <NavLink
          to={item.path || '#'}
          onClick={() => setMobileDrawerOpen(false)}
          className={({ isActive }) =>
            cn(
              'group flex items-center justify-between px-3 py-2 text-xs transition-colors duration-150',
              isActive
                ? 'text-primary font-semibold'
                : 'text-muted-foreground font-normal hover:text-primary',
              sidebarCollapsed && 'w-10 h-10 p-0 justify-center mx-auto'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-2.5 min-w-0 justify-center">
                <div className="shrink-0 transition-transform duration-150 group-hover:scale-110">{item.icon}</div>
                {!sidebarCollapsed && <span className="truncate transition-colors">{item.label}</span>}
              </div>
              {!sidebarCollapsed && item.badge && (
                <Badge
                  variant={item.badge.variant || 'default'}
                  className={cn(
                    'text-[9px] px-1.5 py-0 font-normal transition-colors',
                    isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {item.badge.text}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      )}

      {/* Render Submenu Children */}
      {hasChildren && isExpanded && !sidebarCollapsed && (
        <div className="pl-3 space-y-1 mt-1 animate-in slide-in-from-left-2">
          {item.children?.map((child) => (
            <SidebarMenuItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );

  // Show tooltip popup ONLY when collapsed (icon-only mode)
  const contentElement = sidebarCollapsed ? (
    <Tooltip content={item.label} position="right" className="w-full py-0.5">
      {menuItemElement}
    </Tooltip>
  ) : (
    menuItemElement
  );

  if (item.permission) {
    return <PermissionGuard permission={item.permission as any}>{contentElement}</PermissionGuard>;
  }

  return contentElement;
};
