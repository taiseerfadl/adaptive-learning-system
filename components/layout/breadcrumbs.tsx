"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** مرّرها لتخصيص المسار يدويًا؛ عند إغفالها يُبنى المسار تلقائيًا من الرابط الحالي */
  items?: BreadcrumbItem[];
  /** تسميات عربية لأجزاء الرابط عند البناء التلقائي، مثل: { courses: 'الدورات' } */
  segmentLabels?: Record<string, string>;
  className?: string;
}

function toTitleCase(segment: string): string {
  return segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function buildItemsFromPathname(
  pathname: string,
  segmentLabels?: Record<string, string>,
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  let accumulatedHref = "";
  return segments.map((segment, index) => {
    accumulatedHref += `/${segment}`;
    const isLast = index === segments.length - 1;
    return {
      label: segmentLabels?.[segment] ?? toTitleCase(segment),
      href: isLast ? undefined : accumulatedHref,
    };
  });
}

function Breadcrumbs({ items, segmentLabels, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const resolvedItems =
    items ?? buildItemsFromPathname(pathname, segmentLabels);

  if (resolvedItems.length === 0) return null;

  return (
    <nav
      aria-label={t("nav.home", undefined, "مسار التنقّل")}
      className={cn("flex items-center", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">{t("nav.home", undefined, "الرئيسية")}</span>
          </Link>
          <ChevronRight
            className="icon-directional h-3.5 w-3.5 text-[var(--color-text-muted)]"
            aria-hidden="true"
          />
        </li>
        {resolvedItems.map((item, index) => {
          const isLast = index === resolvedItems.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-1.5"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "font-medium",
                    isLast
                      ? "text-[var(--color-text)]"
                      : "text-[var(--color-text-muted)]",
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="icon-directional h-3.5 w-3.5 text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };
