import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["**/gql/**"],
  },
  {
    ignores: [
      "node_modules",
      "**/gql/**",
      "**/dist/*",
      "**/build/*",
      "**/tsconfig.json",
      "**/generated/",
      "**/prisma/*",
      "**/src/components/ui/**",
      "**/tailwind.config.js",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      react,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-irregular-whitespace": "error",
    },
  },
  eslintConfigPrettier,
];
