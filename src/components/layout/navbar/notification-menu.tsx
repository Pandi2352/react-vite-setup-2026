import React, { useRef, useEffect } from 'react';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { useNotificationStore } from '@/store/notification-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const NotificationMenu: React.FC = () => {
  const { notificationsOpen, setNotificationsOpen, toggleNotifications } = useUIStore();
  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setNotificationsOpen]);

  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleNotifications}
        className="h-9 w-9 p-0 rounded-full relative"
        aria-label="Notifications"
        aria-expanded={notificationsOpen}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Notification Dropdown Popover */}
      {notificationsOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-md border border-border bg-card p-4 shadow-2xl animate-in zoom-in-95 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="h-7 px-2 text-[11px]"
                title="Mark all as read"
              >
                <CheckCheck className="h-3.5 w-3.5 mr-1" /> Read all
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-7 px-2 text-[11px] text-muted-foreground hover:text-destructive"
                title="Clear all notifications"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-72 overflow-y-auto space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center py-6 text-xs text-muted-foreground">No notifications at the moment.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={cn(
                    'p-3 rounded-md border text-xs transition-colors cursor-pointer flex items-start gap-3',
                    n.read ? 'border-border bg-card/40 opacity-70' : 'border-primary/30 bg-primary/5 font-medium'
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {n.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {n.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {n.type === 'info' && <Info className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground leading-tight">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{n.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
