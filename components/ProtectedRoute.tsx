'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '../hooks/usePermissions';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission: string;
  userRole: string;
}

export default function ProtectedRoute({ children, requiredPermission, userRole }: ProtectedRouteProps) {
  const router = useRouter();
  const { hasPermission } = usePermissions(userRole as any);

  useEffect(() => {
    if (!hasPermission(requiredPermission)) {
      router.push('/unauthorized');
    }
  }, [hasPermission, requiredPermission, router]);

  if (!hasPermission(requiredPermission)) {
    return null;
  }

  return <>{children}</>;
}
