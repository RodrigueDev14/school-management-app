import { useCallback } from 'react';
import { DEFAULT_PERMISSIONS, UserRole, Permission } from '../types/roles';

export const usePermissions = (userRole: UserRole) => {
  const hasPermission = useCallback((permissionId: string): boolean => {
    const rolePermissions = DEFAULT_PERMISSIONS[userRole];
    return userRole === 'DIRECTOR' || rolePermissions.some(p => p.id === permissionId);
  }, [userRole]);

  const getModulePermissions = useCallback((module: string): Permission[] => {
    const rolePermissions = DEFAULT_PERMISSIONS[userRole];
    return rolePermissions.filter(p => p.module === module || module === 'all');
  }, [userRole]);

  const canAccessModule = useCallback((module: string): boolean => {
    const rolePermissions = DEFAULT_PERMISSIONS[userRole];
    return userRole === 'DIRECTOR' || rolePermissions.some(p => p.module === module);
  }, [userRole]);

  return {
    hasPermission,
    getModulePermissions,
    canAccessModule,
    role: userRole,
    allPermissions: DEFAULT_PERMISSIONS[userRole]
  };
};
