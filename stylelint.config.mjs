/** @type {import("stylelint").Config} */
export default {
  "extends": ["stylelint-config-standard"],
   customSyntax: "postcss-scss",
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true, 
    "no-descending-specificity": null
  }
};
