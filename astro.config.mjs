// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mrcn.tr",
  output: "static",
  prefetch: { prefetchAll: true },
  integrations: [sitemap(), icon(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["tr", "en"],
    defaultLocale: "en",
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Outfit",
      cssVariable: "--font-outfit",
      subsets: ["latin", "latin-ext"],
      weights: ["100 900"],
    },
  ],
  markdown: {
    shikiConfig: {
      theme: "everforest-dark",
      wrap: true,
    },
  },
});