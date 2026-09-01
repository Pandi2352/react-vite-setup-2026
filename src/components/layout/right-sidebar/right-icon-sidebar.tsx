import React from 'react';
import {
  BotMessageSquare,
  Blocks,
  Palette,
  HelpCircle,
} from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export const RightIconSidebar: React.FC = () => {
  const { activeRightPanel, toggleRightPanel } = useUIStore();

  const navItems = [
    {
      id: 'chat' as const,
      label: 'Forge AI Copilot',
      icon: <BotMessageSquare className="h-5 w-5" />,
      indicator: (
        <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.8)]" />
      ),
    },
    {
      id: 'mcp' as const,
      label: 'Model Context Protocol (MCP) Tools',
      icon: <Blocks className="h-5 w-5" />,
      badge: '4',
    },
    {
      id: 'theme' as const,
      label: 'Theme & Font Engine (30 Schemes, 20 Fonts)',
      icon: <Palette className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      aria-label="Right Tools Activity Bar"
      className="hidden md:flex flex-col items-center justify-between w-12 h-screen border-l border-border bg-card/95 py-3 z-[90] shrink-0 select-none"
    >
      {/* Top Section: Main Drawer Features */}
      <div className="flex flex-col items-center gap-2 w-full px-1">
        {navItems.map((item) => {
          const isActive = activeRightPanel === item.id;
          return (
            <Tooltip key={item.id} content={item.label} position="left">
              <button
                type="button"
                onClick={() => toggleRightPanel(item.id)}
                className={cn(
                  'group relative flex h-9 w-9 items-center justify-center transition-colors duration-150 cursor-pointer',
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary'
                )}
                aria-label={item.label}
              >
                {/* Active indicator pip on left */}
                {isActive && (
                  <span className="absolute -left-1 top-2 bottom-2 w-0.5 rounded-r-full bg-primary" />
                )}

                <div className="transition-transform duration-150 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Optional Status Indicators */}
                {item.indicator}

                {item.badge && (
                  <span className={cn(
                    'absolute -top-0.5 right-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full text-[8px] font-bold px-0.5 transition-colors',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            </Tooltip>
          );
        })}
      </div>

      {/* Bottom Section: Quick Help */}
      <div className="flex flex-col items-center">
        <Tooltip content="Forge Documentation & Keyboard Shortcuts" position="left">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            aria-label="Documentation and Shortcuts"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
};
