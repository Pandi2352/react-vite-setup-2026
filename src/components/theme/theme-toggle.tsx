import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Tooltip content={`Switch to ${isDark ? 'Light' : 'Dark'} Theme`} position="bottom">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className={`h-9 w-9 p-0 text-muted-foreground hover:text-foreground transition-all duration-200 ${className}`}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 rotate-0 scale-100 transition-transform duration-300" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 dark:text-slate-200 rotate-0 scale-100 transition-transform duration-300" />
        )}
      </Button>
    </Tooltip>
  );
};
