"use client";

import { useLanguage } from "@/context/language-context";

export default function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-hover)]"
    >
      <span aria-hidden="true">文A</span>
      <span>{locale === "ar" ? "English" : "العربية"}</span>
    </button>
  );
}
