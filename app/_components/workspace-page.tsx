"use client";

import Link from "next/link";
import { ArrowRight, Construction } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface RoutePlaceholderProps {
  label: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

/** A clear, theme-aware placeholder for routes whose feature workflow is not implemented yet. */
export function RoutePlaceholder({
  label,
  description,
  backHref,
  backLabel,
}: RoutePlaceholderProps) {
  const { t } = useLanguage();

  const finalDescription =
    description ??
    t(
      "common.underConstructionDesc",
      undefined,
      "هذه الواجهة تحتاج إلى استكمال منطق الصفحة وربطها بمصدر البيانات قبل استخدامها فعليًا.",
    );

  const finalBackLabel =
    backLabel ?? t("common.backToSection", undefined, "العودة إلى القسم");

  return (
    <section
      className="mx-auto w-full max-w-5xl space-y-6"
      aria-labelledby="route-placeholder-title"
    >
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm sm:p-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-500">
          <Construction className="h-6 w-6" aria-hidden="true" />
        </div>
        <p className="mb-2 text-sm font-semibold text-blue-500">
          {t("common.underConstruction", undefined, "قيد الاستكمال")}
        </p>
        <h1
          id="route-placeholder-title"
          className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
        >
          {label}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-secondary)]">
          {finalDescription}
        </p>
        {backHref && (
          <Link
            href={backHref}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <ArrowRight className="icon-directional h-4 w-4" aria-hidden="true" />
            {finalBackLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
