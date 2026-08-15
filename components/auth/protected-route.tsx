'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { Spinner, Button } from '@/components/ui';
import { useAuth } from '@/context/auth-context';
import type { AccountType } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** أنواع الحسابات المسموح لها بالوصول؛ اتركها فارغة للسماح لأي مستخدم مسجّل دخول */
  allowedRoles?: AccountType[];
  /** المسار الذي يُعاد توجيه الزائر غير المسجّل إليه */
  loginPath?: string;
}

/**
 * ProtectedRoute — يغلّف صفحات لوحة التحكم فيمنع وصول الزوار غير المسجَّلين،
 * ويمنع أصحاب الأدوار غير المصرَّح لها من عرض صفحات لا تخصهم
 * (مثال: طالب يحاول فتح مسار خاص بالإدارة).
 */
function ProtectedRoute({ children, allowedRoles, loginPath = '/login' }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectParam = typeof window !== 'undefined' ? `?redirect=${encodeURIComponent(window.location.pathname)}` : '';
      router.replace(`${loginPath}${redirectParam}`);
    }
  }, [isLoading, isAuthenticated, loginPath, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-slate-500">جارٍ التحقق من الجلسة...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // في طور إعادة التوجيه إلى صفحة الدخول
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const isRoleAllowed = !allowedRoles || allowedRoles.includes(user.accountType);

  if (!isRoleAllowed) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold text-slate-100">لا تملك صلاحية الوصول</h2>
          <p className="max-w-sm text-sm text-slate-500">
            هذه الصفحة مخصصة لأنواع حسابات أخرى، ولا تملك حسابك الصلاحية لعرضها.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          العودة إلى لوحة التحكم
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}

export { ProtectedRoute };
