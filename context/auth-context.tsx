'use client';

/**
 * AuthContext — المصدر الموحّد لحالة المصادقة في التطبيق بالكامل.
 *
 * ملاحظة معمارية: هذا الملف داعم (وليس ضمن لقطة الشاشة المطلوبة) لكنه ضروري
 * لعمل ملفات auth/* بدون أخطاء — فهي تعتمد عليه لجلب المستخدم الحالي وتنفيذ
 * تسجيل الدخول/الخروج، بدلاً من أن يكرر كل نموذج منطق الشبكة بنفسه.
 * لا يضيف أي حزمة خارجية غير مذكورة في README (React الأساسي فقط).
 */

import * as React from 'react';
import type { AuthResponse, LoginDTO, RegisterDTO, User } from '@/types';

const ACCESS_TOKEN_KEY = 'als_access_token';
const REFRESH_TOKEN_KEY = 'als_refresh_token';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api';

interface AuthContextValue {
  /** المستخدم الحالي، أو null قبل انتهاء التحقق أو في حال عدم تسجيل الدخول */
  user: User | null;
  /** true أثناء التحقق الأولي من الجلسة عند تحميل التطبيق */
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginDTO) => Promise<User>;
  register: (data: RegisterDTO) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

async function parseAuthResponse(res: Response): Promise<AuthResponse> {
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.data) {
    const message = body?.message ?? 'تعذّر إتمام العملية، حاول مرة أخرى';
    throw new Error(message);
  }
  return body.data as AuthResponse;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const persistTokens = React.useCallback((data: AuthResponse) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.tokens.refreshToken);
  }, []);

  const refreshUser = React.useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('unauthenticated');
      const body = await res.json();
      setUser(body.data as User);
    } catch {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = React.useCallback(
    async (data: LoginDTO) => {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const auth = await parseAuthResponse(res);
      persistTokens(auth);
      setUser(auth.user);
      return auth.user;
    },
    [persistTokens]
  );

  const register = React.useCallback(
    async (data: RegisterDTO) => {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const auth = await parseAuthResponse(res);
      persistTokens(auth);
      setUser(auth.user);
      return auth.user;
    },
    [persistTokens]
  );

  const logout = React.useCallback(async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(null);
    if (token) {
      fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {
        /* تسجيل الخروج محليًا يبقى ساريًا حتى لو فشل نداء الخادم */
      });
    }
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, isLoading, isAuthenticated: !!user, login, register, logout, refreshUser }),
    [user, isLoading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth يجب أن يُستخدم داخل <AuthProvider>');
  }
  return ctx;
}
