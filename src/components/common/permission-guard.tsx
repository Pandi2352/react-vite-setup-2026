import React from 'react';
import { usePermission } from '@/hooks/use-permission';
import { Permission, Role } from '@/utils/constants';

export interface PermissionGuardProps {
  permission?: Permission | Permission[];
  role?: Role | Role[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  role,
  fallback = null,
  children,
}) => {
  const { hasPermission, hasRole } = usePermission();

  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  if (role && !hasRole(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
