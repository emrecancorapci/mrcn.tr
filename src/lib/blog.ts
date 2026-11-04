import type { Locale } from "@/i18n";

/** Formats a post date for the given locale, e.g. "May 23, 2026" / "23 Mayıs 2026". */
export const formatPostDate = (date: Date, locale: Locale): string =>
  new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { dateStyle: "long" }).format(date);

/** Rough reading time in minutes (220 words per minute), minimum 1. */
export const postReadingTime = (body: string): number =>
  Math.max(1, Math.ceil(body.split(/\s+/).filter(Boolean).length / 220));
