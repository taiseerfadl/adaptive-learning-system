'use client';

/**
 * ThemeToggle — يعتمد على next-themes (يتطلب لفّ الجذر بـ
 * <ThemeProvider attribute="class" defaultTheme="dark"> من مكتبة next-themes).
 * الهوية البصرية الحالية للنظام مبنية للوضع الداكن أساسًا؛ هذا المكوّن يوفّر
 * التبديل الوظيفي كما هو مطلوب في الشجرة، مع مؤشر تحميل يمنع وميض
 * (hydration mismatch) قبل معرفة السمة الفعلية في المتصفح.
 */

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled aria-hidden="true" className="opacity-0" />;
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export { ThemeToggle };
