import React from 'react';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { IconButton } from '@/components/ui/icon-button';

export const MobileMenuButton: React.FC = () => {
  const { toggleMobileDrawer } = useUIStore();

  return (
    <IconButton
      icon={<Menu className="h-5 w-5" />}
      aria-label="Toggle Navigation Drawer"
      tooltip="Navigation Menu"
      variant="ghost"
      size="md"
      onClick={toggleMobileDrawer}
      className="md:hidden"
    />
  );
};
