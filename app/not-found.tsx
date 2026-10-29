"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] p-6 text-center text-[var(--color-text)]">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-lg sm:p-10">
        <p className="text-sm font-bold tracking-wide text-blue-500">404</p>
        <h1 className="mt-2 text-3xl font-bold">
          {t("errors.pageNotFoundTitle", undefined, "الصفحة غير موجودة")}
        </h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
          {t("errors.pageNotFoundDesc", undefined, "تحقق من الرابط أو ارجع إلى الصفحة الرئيسية.")}
        </p>
        <Link
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          href="/"
        >
          {t("common.backToHome", undefined, "العودة للرئيسية")}
        </Link>
      </div>
    </main>
  );
}
