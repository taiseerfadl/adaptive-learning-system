'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Button,
  Separator,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';
import { useAuth } from '@/contexts/auth-context';

const PUBLIC_NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الدورات', href: '/courses' },
  { label: 'المدربون', href: '/trainers' },
  { label: 'عن المنصة', href: '/about' },
  { label: 'تواصل معنا', href: '/contact' },
];

/**
 * Navbar — شريط التنقّل العلوي للصفحات العامة قبل تسجيل الدخول (الهبوط،
 * الدورات، وغيرها). لواجهة لوحة التحكم بعد الدخول استخدم Topbar + Sidebar.
 */
function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            م
          </span>
          <span className="hidden text-sm font-semibold text-slate-100 sm:inline">منصة التعلّم التكيفي</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {PUBLIC_NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  active ? 'text-blue-400' : 'text-slate-400 hover:text-slate-100'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-1.5">
          <div className="hidden items-center gap-1 sm:flex">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {!isLoading && (
            <>
              {isAuthenticated && user ? (
                <div className="hidden items-center gap-3 sm:flex">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/${user.accountType}`}>لوحة التحكم</Link>
                  </Button>
                  <UserNav />
                </div>
              ) : (
                <div className="hidden items-center gap-2 sm:flex">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/register">إنشاء حساب</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="فتح القائمة">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="start" className="flex w-72 flex-col">
              <SheetHeader>
                <SheetTitle>القائمة</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1">
                {PUBLIC_NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors',
                        pathname === link.href ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <Separator className="my-2" />

              <div className="flex flex-col gap-2.5">
                {isAuthenticated && user ? (
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href={`/dashboard/${user.accountType}`}>لوحة التحكم</Link>
                    </Button>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login">تسجيل الدخول</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/register">إنشاء حساب</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>

              <div className="mt-auto flex items-center justify-center gap-2 pt-4">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
