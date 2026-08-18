import { en, type UIKeys } from "./ui/en";
import { tr } from "./ui/tr";

export type Locale = "en" | "tr";

const dictionaries: Record<Locale, Record<UIKeys, string>> = { en, tr };

/**
 * Translate a UI string. `params` replaces `{name}` placeholders in the string
 * (e.g. `t(locale, "footer.copyright", { year: 2026 })`).
 */
export const t = (
  locale: Locale,
  key: UIKeys,
  params?: Record<string, string | number>,
): string => {
  let text = dictionaries[locale][key];
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
};

/**
 * Resolve the locale from `Astro.currentLocale`. Unknown/undefined values fall
 * back to the default locale ("en"), matching unprefixed routes.
 */
export const currentLocale = (astroLocale: string | undefined): Locale =>
  astroLocale === "tr" ? "tr" : "en";

/** Prefix an internal path with the locale route segment ("tr" only; "en" is unprefixed). */
export const localePath = (locale: Locale, path: string): string =>
  locale === "tr" ? `/tr${path === "/" ? "/" : path}` : path;

/**
 * Split a translation string on `*` markers into plain/emphasized segments,
 * e.g. `"I *listen to* X"` → `[{ text: "I ", marked: false }, { text: "listen to", marked: true }, ...]`.
 * Used where translated sentences need inline emphasis with locale-dependent word order.
 */
export const markedSegments = (text: string): { text: string; marked: boolean }[] =>
  text
    .split("*")
    .map((segment, index) => ({ text: segment, marked: index % 2 === 1 }))
    .filter((segment) => segment.text !== "");
