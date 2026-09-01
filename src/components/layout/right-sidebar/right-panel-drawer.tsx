import React from 'react';
import { useUIStore } from '@/store/ui-store';
import { ChatPanel } from '@/features/chat';
import { MCPPanel } from '@/features/mcp';
import { TelemetryPanel } from '@/features/telemetry';
import { I18nPanel } from '@/features/i18n';
import { DocsPanel } from '@/features/docs';
import { ThemePanel } from '@/components/theme/theme-panel';
import { RightResizeHandle } from './right-resize-handle';
import { cn } from '@/lib/utils';

export const RightPanelDrawer: React.FC = () => {
  const { activeRightPanel, rightPanelWidth, isRightResizing, setActiveRightPanel } = useUIStore();

  if (!activeRightPanel) return null;

  const content = (
    <div className="flex flex-col h-full w-full bg-transparent overflow-hidden">
      {activeRightPanel === 'chat' && <ChatPanel />}
      {activeRightPanel === 'mcp' && <MCPPanel />}
      {activeRightPanel === 'telemetry' && <TelemetryPanel />}
      {activeRightPanel === 'i18n' && <I18nPanel />}
      {activeRightPanel === 'docs' && <DocsPanel />}
      {activeRightPanel === 'theme' && <ThemePanel />}
    </div>
  );

  return (
    <>
      {/* Soft Light Backdrop Overlay covering whole page including left sidebar */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200 z-[80]"
        onClick={() => setActiveRightPanel(null)}
      />

      {/* Desktop Resizable Right Drawer Container */}
      <aside
        aria-label="Right Side Drawer Panel"
        style={{ width: `${rightPanelWidth}px` }}
        className={cn(
          'hidden md:flex flex-col fixed right-12 top-0 z-[85] h-screen border-l border-border bg-card/95 backdrop-blur-md overflow-visible',
          isRightResizing ? 'transition-none' : 'transition-[width] duration-300 ease-in-out animate-in slide-in-from-right'
        )}
      >
        <RightResizeHandle />
        {content}
      </aside>

      {/* Mobile Responsive Drawer Overlay */}
      <div className="md:hidden fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Mobile Drawer Panel">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
          onClick={() => setActiveRightPanel(null)}
        />

        {/* Drawer Panel */}
        <aside aria-label="Mobile Right Drawer Panel" className="relative z-50 w-full max-w-[85vw] h-full bg-card border-l border-border animate-in slide-in-from-right">
          {content}
        </aside>
      </div>
    </>
  );
};
