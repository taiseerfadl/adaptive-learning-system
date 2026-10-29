"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  Button,
  Separator,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";

/**
 * Navbar — شريط التنقّل العلوي للصفحات العامة قبل تسجيل الدخول (الهبوط،
 * الدورات، وغيرها). لواجهة لوحة التحكم بعد الدخول استخدم Topbar + Sidebar.
 */
function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, loading } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const publicNavLinks = React.useMemo(
    () => [
      { label: t("nav.home", undefined, "الرئيسية"), href: "/" },
      { label: t("nav.courses", undefined, "الدورات"), href: "/courses" },
      { label: t("nav.trainers", undefined, "المدربون"), href: "/trainers" },
      { label: t("nav.about", undefined, "عن المنصة"), href: "/about" },
      { label: t("nav.contact", undefined, "تواصل معنا"), href: "/contact" },
    ],
    [t],
  );

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg)] backdrop-blur-sm">
      <div className="container flex h-16 items-center gap-6 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            {t("common.appNameShort", undefined, "م")}
          </span>
          <span className="hidden text-sm font-semibold text-[var(--color-text)] sm:inline">
            {t("common.appName", undefined, "منصة التعلّم التكيفي")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNavLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-blue-400"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {!loading && (
            <>
              {isAuthenticated && user ? (
                <div className="hidden items-center gap-3 sm:flex">
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={
                        user.accountType === "trainer"
                          ? "/instructor"
                          : `/${user.accountType}`
                      }
                    >
                      {t("nav.dashboard", undefined, "لوحة التحكم")}
                    </Link>
                  </Button>
                  <UserNav />
                </div>
              ) : (
                <div className="hidden items-center gap-2 sm:flex">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/auth/login">{t("nav.login", undefined, "تسجيل الدخول")}</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/auth/register">{t("nav.register", undefined, "إنشاء حساب جديد")}</Link>
                  </Button>
                </div>
              )}
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={t("nav.openNav", undefined, "فتح قائمة التنقّل")}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="start" className="flex w-72 flex-col p-0">
              <SheetHeader className="px-4 pt-5">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                    {t("common.appNameShort", undefined, "م")}
                  </span>
                  <SheetTitle className="text-sm">
                    {t("common.appName", undefined, "منصة التعلّم التكيفي")}
                  </SheetTitle>
                </Link>
              </SheetHeader>

              <Separator className="mt-4" />

              <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
                {publicNavLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-blue-500/10 text-blue-400 font-semibold"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]",
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="border-t border-[var(--color-border)] p-4 flex flex-col gap-3">
                <div className="flex items-center justify-center gap-3">
                  <ThemeToggle />
                  <LanguageSwitcher />
                </div>
                {!loading && (
                  <>
                    {isAuthenticated && user ? (
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline" className="w-full">
                          <Link
                            href={
                              user.accountType === "trainer"
                                ? "/instructor"
                                : `/${user.accountType}`
                            }
                            onClick={() => setMobileOpen(false)}
                          >
                            {t("nav.dashboard", undefined, "لوحة التحكم")}
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button asChild variant="outline" className="w-full">
                          <Link
                            href="/auth/login"
                            onClick={() => setMobileOpen(false)}
                          >
                            {t("nav.login", undefined, "تسجيل الدخول")}
                          </Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link
                            href="/auth/register"
                            onClick={() => setMobileOpen(false)}
                          >
                            {t("nav.register", undefined, "إنشاء حساب جديد")}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export { Navbar };
