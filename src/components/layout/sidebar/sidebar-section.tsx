import React from 'react';
import { useUIStore } from '@/store/ui-store';

export const SidebarSection: React.FC<{ title: string }> = ({ title }) => {
  const { sidebarCollapsed } = useUIStore();

  if (sidebarCollapsed) {
    return <div className="w-8 h-[1px] bg-border/60 mx-auto my-2.5" />;
  }

  return (
    <div className="pt-3.5 pb-1.5 px-3 border-t border-border/50 mt-3 first:mt-0 first:pt-1 first:border-t-0 text-[11px] font-bold tracking-wider text-foreground/80 dark:text-foreground/90 uppercase select-none">
      {title}
    </div>
  );
};
