// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://mrcn.tr",
  output: "static",
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
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
