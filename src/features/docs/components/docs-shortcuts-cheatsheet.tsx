import React from 'react';
import { KEYBOARD_SHORTCUTS } from '../data/features-catalog';
import { Command } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DocsShortcutsCheatsheet: React.FC = () => {
  return (
    <div className="space-y-3 p-3 rounded-xl border border-border bg-card/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Command className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-foreground">Global Keyboard Shortcuts</h3>
            <p className="text-[10px] text-muted-foreground">Boost navigation speed across the application</p>
          </div>
        </div>

        <Badge variant="outline" className="text-[9px] font-mono px-1.5 py-0">
          5 Shortcuts
        </Badge>
      </div>

      <div className="space-y-1.5 pt-1">
        {KEYBOARD_SHORTCUTS.map((sc, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/50 text-xs"
          >
            <span className="text-[11px] text-foreground font-medium">{sc.description}</span>
            <div className="flex items-center gap-1">
              {sc.keys.map((k) => (
                <kbd
                  key={k}
                  className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-card border border-border shadow-2xs text-foreground"
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
