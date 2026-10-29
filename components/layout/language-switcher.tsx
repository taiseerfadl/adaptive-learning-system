"use client";

import * as React from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface LanguageOption {
  code: Locale;
  label: string;
  nativeName: string;
  shortLabel: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: "ar",
    label: "العربية",
    nativeName: "Arabic",
    shortLabel: "AR",
  },
  {
    code: "en",
    label: "English",
    nativeName: "الإنجليزية",
    shortLabel: "EN",
  },
];

interface LanguageSwitcherProps {
  className?: string;
  /** ما إذا كان يُراد عرض التسمية القصيرة على الشاشات الصغيرة جداً */
  compact?: boolean;
}

export function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === locale) ?? LANGUAGES[0];

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex h-8 items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs sm:text-sm opacity-60",
          className,
        )}
      >
        <Globe className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
        <span className="truncate">{currentLanguage.label}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)]" aria-hidden="true" />
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("common.switchLanguage", undefined, "تغيير اللغة")}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            "group inline-flex h-8 items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs sm:text-sm font-medium text-[var(--color-text)] transition-colors select-none",
            "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
            isOpen && "bg-[var(--color-surface-hover)] border-blue-500/50",
            className,
          )}
        >
          {/* 1. أيقونة اللغة: تظهر أولاً في التدفق (Start) - على اليمين في RTL، وعلى اليسار في LTR */}
          <Globe
            className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400"
            aria-hidden="true"
          />

          {/* 2. اسم اللغة المختارة بوضوح في المنتصف */}
          <span className="truncate">
            {compact ? currentLanguage.shortLabel : currentLanguage.label}
          </span>

          {/* 3. سهم القائمة المنسدلة: يظهر في جهة النهاية (End) - على اليسار في RTL، وعلى اليمين في LTR */}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200",
              isOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-36 min-w-[9rem] p-1 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-lg rounded-xl z-50"
      >
        {LANGUAGES.map((lang) => {
          const isSelected = lang.code === locale;
          return (
            <DropdownMenuItem
              key={lang.code}
              onSelect={() => setLocale(lang.code)}
              className={cn(
                "flex items-center justify-between gap-2 px-2.5 py-2 text-xs sm:text-sm rounded-lg cursor-pointer transition-colors",
                isSelected
                  ? "bg-blue-500/10 text-blue-500 dark:text-blue-400 font-semibold"
                  : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[var(--color-text-muted)] w-5">
                  {lang.shortLabel}
                </span>
                <span>{lang.label}</span>
              </span>

              {isSelected && (
                <Check
                  className="h-4 w-4 shrink-0 text-blue-500 dark:text-blue-400"
                  aria-hidden="true"
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
