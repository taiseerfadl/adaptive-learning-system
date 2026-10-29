"use client";

import { useLanguage } from "@/context/language-context";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] p-6 text-center text-[var(--color-text)]">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-lg">
        <h1 className="text-2xl font-bold">
          {t("errors.unexpectedErrorTitle", undefined, "حدث خطأ غير متوقع")}
        </h1>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
          {t("errors.unexpectedErrorDesc", undefined, "تعذر إكمال عرض هذه الصفحة. يمكنك المحاولة مرة أخرى.")}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          {t("common.retry", undefined, "إعادة المحاولة")}
        </button>
      </div>
    </main>
  );
}
