import type { Config } from "prettier";

const config: Config = {
  useTabs: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  bracketSpacing: true,
  arrowParens: "always",
  trailingComma: "es5",
  tabWidth: 2,
  printWidth: 100,
  experimentalTernaries: true,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;
