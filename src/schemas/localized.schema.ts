import { z } from "astro/zod";

/** A string with an explicit value per locale. Both locales are required so a missing
 *  translation fails the build instead of silently rendering at runtime. */
export const localizedStringSchema = z.object({
  en: z.string(),
  tr: z.string(),
});

export type LocalizedString = z.infer<typeof localizedStringSchema>;

/** Pick the value of a localized string for a locale. */
export const localizedText = (value: LocalizedString, locale: "en" | "tr") => value[locale];
