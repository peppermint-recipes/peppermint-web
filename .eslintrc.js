module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'class-methods-use-this': 'off',
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript',
  ],
};
