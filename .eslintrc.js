/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quotes */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    '@typescript-eslint/quotes': ['error', 'single'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-ally/control-has-associated-label': 'off',
    'react/no-array-index-key': 'off',
    'comma-dangle': 'off',
    'arrow-body-style': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-shadow': 'off',
    'spaced-comment': 'off',
    'operator-linebreak': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-ally/anchor-is-valid': 'off',
    'global-require': 'off',
    'jsx-ally/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'react/jsx-curly-newline': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'operator-assignment': ['error', 'never'],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
};
