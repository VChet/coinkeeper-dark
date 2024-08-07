export default {
  extends: "stylelint-config-standard",
  plugins: ["stylelint-prettier"],
  rules: {
    "prettier/prettier": [true, {
      trailingComma: "none",
      tabWidth: 2,
      semi: true,
      singleQuote: false,
      printWidth: 120,
      bracketSpacing: true,
      endOfLine: "auto"
    }],
    "at-rule-no-vendor-prefix": null,
    "at-rule-empty-line-before": "never",
    "comment-empty-line-before": "never",
    "rule-empty-line-before": "never",
    "comment-whitespace-inside": null,
    "media-feature-range-notation": null,
    "no-descending-specificity": null,
    "selector-class-pattern": null,
    "selector-no-vendor-prefix": null
  }
};
