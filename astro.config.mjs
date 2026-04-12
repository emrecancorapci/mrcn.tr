// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://mrcn.tr",
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Outfit",
      cssVariable: "--font-outfit",
      weights: [100,200,300,400, 500, 600, 700, 800, 900],
    }
  ],
  integrations: [sitemap(), icon()],
  markdown: {
    shikiConfig: {
      theme: "everforest-dark",
      wrap: true,
    },
  },
});