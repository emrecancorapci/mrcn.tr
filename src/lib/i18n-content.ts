import type { Locale } from "@/i18n";

/** Locale of a content entry, derived from its id ("krustie.tr" -> "tr", "krustie" -> "en"). */
export const entryLocale = (id: string): Locale => (id.endsWith(".tr") ? "tr" : "en");

/** Entry id without the locale suffix ("krustie.tr" -> "krustie"). */
export const baseId = (id: string) => id.replace(/\.tr$/, "");

/**
 * Entries for a locale. For "en" this is every non-`.tr` entry. For "tr" it is every
 * `.tr` entry, plus entries that only exist in English (they display as fallback).
 */
export function forLocale<T extends { id: string }>(entries: T[], locale: Locale): T[] {
  if (locale === "en") {
    return entries.filter((entry) => entryLocale(entry.id) === "en");
  }

  const translatedBases = new Set(
    entries.filter((entry) => entryLocale(entry.id) === "tr").map((entry) => baseId(entry.id)),
  );

  return entries.filter(
    (entry) => entryLocale(entry.id) === "tr" || !translatedBases.has(baseId(entry.id)),
  );
}
