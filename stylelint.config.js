export default {
  extends: [
    "stylelint-config-standard",
    "@stylistic/stylelint-config"
  ],
  rules: {
    "@stylistic/selector-list-comma-newline-after": "always-multi-line",
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
