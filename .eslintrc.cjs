/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    semi: 2,
    quotes: [1, "single"],
    'no-console': 1,
  },
}
