// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mrcn.tr",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "everforest-dark",
      wrap: true,
    },
  },
});
