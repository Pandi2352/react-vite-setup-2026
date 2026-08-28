import React from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeMode, COLOR_SCHEMES_CATALOG } from '@/lib/theme';
import { cn } from '@/lib/utils';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, colorPalette, setColorPalette } = useTheme();

  const options: { id: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light', icon: <Sun className="h-4 w-4 text-amber-500" /> },
    { id: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4 text-indigo-400" /> },
    { id: 'system', label: 'System', icon: <Laptop className="h-4 w-4 text-emerald-500" /> },
  ];

  const popularSchemes = COLOR_SCHEMES_CATALOG.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* 3-Way Mode Segmented Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Appearance Theme Mode
        </label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-muted/50 rounded-md border border-border">
          {options.map((opt) => {
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={cn(
                  'flex items-center justify-center gap-2 py-2 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer select-none',
                  isSelected
                    ? 'bg-card text-foreground border border-border'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                )}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Color Schemes Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Featured Color Palettes
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {popularSchemes.map((acc) => {
            const isSelected = colorPalette === acc.id;
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => setColorPalette(acc.id)}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-md border text-xs font-medium transition-all cursor-pointer select-none',
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-border bg-card hover:bg-muted/40 text-foreground'
                )}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full shrink-0 flex items-center justify-center text-white"
                  style={{ backgroundColor: acc.primary }}
                >
                  {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
                <span className="truncate">{acc.name.split('.')[1]?.trim() || acc.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
