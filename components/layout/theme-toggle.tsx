"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/context/language-context";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-label={t("common.switchTheme", undefined, "التبديل بين الوضع الفاتح والداكن")}
      aria-checked={isDark}
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={[
        "relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border p-1 transition-colors duration-200",
        "border-[var(--color-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        isDark ? "bg-slate-800" : "bg-[var(--color-surface-hover)]",
        "disabled:cursor-wait disabled:opacity-60",
      ].join(" ")}
    >
      <span
        className={[
          "absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md",
          "transition-transform duration-200 ease-in-out",
          isDark ? "translate-x-8" : "translate-x-0",
        ].join(" ")}
      >
        {isDark ? (
          <Moon size={15} className="text-blue-700" aria-hidden="true" />
        ) : (
          <Sun size={15} className="text-amber-500" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}

export { ThemeToggle };
