import React from 'react';
import { Menu } from 'lucide-react';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';

export const MobileMenuButton: React.FC = () => {
  const { toggleMobileDrawer } = useUIStore();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleMobileDrawer}
      className="md:hidden h-9 w-9 p-0"
      aria-label="Toggle Navigation Drawer"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};
