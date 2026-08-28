import { useAuthStore } from '@/store/auth-store';
import { Permission, Role } from '@/utils/constants';

export function usePermission() {
  const user = useAuthStore((state) => state.user);

  const hasPermission = (requiredPermission: Permission | Permission[]): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;

    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some((perm) => user.permissions.includes(perm));
    }
    return user.permissions.includes(requiredPermission);
  };

  const hasRole = (requiredRole: Role | Role[]): boolean => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  return { hasPermission, hasRole, user };
}
