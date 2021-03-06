/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "no-undef": 0,
    "no-empty": 0,
    "react/jsx-no-duplicate-props": 0,
    curly: 1,
    eqeqeq: 1,
    "no-console": "warn",
  },
};
