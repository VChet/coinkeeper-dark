import standard from "eslint-config-standard";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest" },
      globals: {
        ...globals.browser
      }
    }
  },
  ...compat.config(standard),
  {
    rules: {
      "max-len": ["warn", { code: 120 }],
      "no-console": "off",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "space-before-function-paren": ["error", "never"]
    }
  }
];
