"use client";

import * as React from "react";
import {
  type Locale,
  type Direction,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALE_COOKIE_KEY,
  getDirection,
  getTranslation,
} from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  dir: Direction;
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (
    key: string,
    variables?: Record<string, string | number>,
    fallback?: string,
  ) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = React.useState(false);

  // Initialize from storage or cookie
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored === "ar" || stored === "en") {
        setLocaleState(stored);
        applyDocumentAttributes(stored);
      } else {
        const cookieMatch = document.cookie.match(
          new RegExp(`(?:^|; )${LOCALE_COOKIE_KEY}=([^;]*)`),
        );
        const cookieLocale = cookieMatch ? (decodeURIComponent(cookieMatch[1]) as Locale) : null;
        if (cookieLocale === "ar" || cookieLocale === "en") {
          setLocaleState(cookieLocale);
          applyDocumentAttributes(cookieLocale);
        } else {
          applyDocumentAttributes(DEFAULT_LOCALE);
        }
      }
    } catch {
      applyDocumentAttributes(DEFAULT_LOCALE);
    }
    setMounted(true);
  }, []);

  function applyDocumentAttributes(loc: Locale) {
    const direction = getDirection(loc);
    if (typeof document !== "undefined") {
      document.documentElement.lang = loc;
      document.documentElement.dir = direction;
      document.documentElement.setAttribute("data-lang", loc);
      document.documentElement.setAttribute("data-dir", direction);
    }
  }

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    applyDocumentAttributes(newLocale);

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.cookie = `${LOCALE_COOKIE_KEY}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      console.error("Failed to persist locale:", e);
    }
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const t = React.useCallback(
    (
      key: string,
      variables?: Record<string, string | number>,
      fallback?: string,
    ) => {
      return getTranslation(locale, key, variables, fallback);
    },
    [locale],
  );

  const value = React.useMemo(
    () => ({
      locale,
      dir,
      isRTL,
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, dir, isRTL, setLocale, toggleLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export const useTranslation = useLanguage;
