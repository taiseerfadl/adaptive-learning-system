import { ar, type Translations } from "./translations/ar";
import { en } from "./translations/en";

export type Locale = "ar" | "en";
export type Direction = "rtl" | "ltr";

export const translations: Record<Locale, Translations> = {
  ar,
  en,
};

export const DEFAULT_LOCALE: Locale = "ar";
export const LOCALE_STORAGE_KEY = "adaptive-learning-lang";
export const LOCALE_COOKIE_KEY = "NEXT_LOCALE";

export function getDirection(locale: Locale): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Access nested dictionary keys safely, e.g. "common.appName" or "auth.loginSubmit"
 */
export function getTranslation(
  locale: Locale,
  key: string,
  variables?: Record<string, string | number>,
  fallback?: string,
): string {
  const dict = translations[locale] || translations[DEFAULT_LOCALE];
  const keys = key.split(".");
  let current: unknown = dict;

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      current = undefined;
      break;
    }
  }

  // Fallback to default locale if missing in selected locale
  if (current === undefined && locale !== DEFAULT_LOCALE) {
    let fallbackDict: unknown = translations[DEFAULT_LOCALE];
    for (const k of keys) {
      if (fallbackDict && typeof fallbackDict === "object" && k in fallbackDict) {
        fallbackDict = (fallbackDict as Record<string, unknown>)[k];
      } else {
        fallbackDict = undefined;
        break;
      }
    }
    current = fallbackDict;
  }

  if (typeof current !== "string") {
    return fallback ?? key;
  }

  if (variables) {
    let result = current;
    for (const [vKey, vVal] of Object.entries(variables)) {
      result = result.replace(new RegExp(`\\{${vKey}\\}`, "g"), String(vVal));
    }
    return result;
  }

  return current;
}

