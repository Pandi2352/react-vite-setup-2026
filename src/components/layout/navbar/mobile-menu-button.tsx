import React from 'react';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';

export const MobileMenuButton: React.FC = () => {
  const { toggleMobileDrawer } = useUIStore();

  return (
    <button
      type="button"
      onClick={toggleMobileDrawer}
      className="md:hidden flex h-9 w-9 items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      aria-label="Toggle Navigation Drawer"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
};
