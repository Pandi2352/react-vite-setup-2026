import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User as UserIcon, Settings, LogOut, Sun, Moon, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useTheme } from '@/hooks/useTheme';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const UserMenu: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-2 py-1 rounded-lg border border-transparent hover:border-border/80 hover:bg-muted/60 transition-all cursor-pointer focus:outline-none select-none"
        aria-label="User Profile Menu"
        aria-expanded={isOpen}
      >
        <Avatar name={user.name} size="sm" />
        <div className="hidden lg:flex flex-col text-left leading-tight max-w-[120px]">
          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{user.name}</span>
          <span className="text-[10px] text-muted-foreground truncate">{user.role}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-2xl animate-in zoom-in-95 z-50">
          <div className="p-3 border-b border-border mb-1">
            <p className="text-sm font-bold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <Badge variant="default" className="mt-2 text-[10px]">
              <ShieldCheck className="h-3 w-3 mr-1" />
              {user.role}
            </Badge>
          </div>

          <div className="space-y-0.5 py-1">
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              Profile Information
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md hover:bg-accent text-foreground transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Account Settings
            </Link>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md hover:bg-accent text-foreground transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                {resolvedTheme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700" />
                )}
                Toggle Theme
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold">{theme}</span>
            </button>
          </div>

          <div className="pt-1 border-t border-border mt-1">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md hover:bg-destructive/10 text-destructive transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
