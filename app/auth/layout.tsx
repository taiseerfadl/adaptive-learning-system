"use client";

import * as React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">

      {/* شريط التحكم بالثيم واللغة */}
      <header className="relative z-20 flex shrink-0 items-center justify-end gap-2 px-4 py-3 sm:px-6">
        <ThemeToggle />
        <LanguageSwitcher />
      </header>

      {/* المحتوى الرئيسي: التمرير عند الحاجة فقط وعلى طرف الشاشة */}
      <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="grid min-h-full w-full grid-cols-1 lg:grid-cols-2">

          {/* قسم تسجيل الدخول */}
          <section className="flex min-h-full items-center justify-center px-4 py-6 sm:px-8 lg:px-10 xl:px-14">
            <div className="my-auto w-full max-w-md">
              {children}
            </div>
          </section>

          {/* قسم الصورة التعريفية */}
          <aside className="relative hidden min-h-full items-center justify-center px-6 py-8 lg:flex xl:px-12">

            {/* إضاءة خلفية خفيفة تتكيف مع الثيم */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(59,130,246,0.09),transparent_72%)]" />

            <div className="relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-4 text-center">

              {/* صورة المنصة */}
              <div className="flex w-full items-center justify-center">
                <Image
                  src="/images/auth.png"
                  alt="صورة منصة التعلم"
                  width={900}
                  height={700}
                  priority
                  className="h-auto max-h-[52dvh] w-full max-w-[560px] object-contain"
                />
              </div>

              {/* اسم المنصة */}
              <h1 className="max-w-xl text-lg font-black leading-relaxed tracking-tight sm:text-xl xl:text-2xl">
                {t(
                  "auth.heroTitle",
                  undefined,
                  "منصة التعلّم التكيفي والتوثيق الأكاديمي الرقمي "
                )}
              </h1>

              {/* وصف المنصة */}
              <p className="mx-auto max-w-lg text-sm leading-7 text-[var(--color-text-muted)]">
                {t(
                  "auth.heroDesc",
                  undefined,
                  "تجربة تعليمية شخصية تتابع مستوى الفهم وتساعد على اختيار المسار المناسب."
                )}
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* حقوق النشر */}
      
    </div>
  );
}