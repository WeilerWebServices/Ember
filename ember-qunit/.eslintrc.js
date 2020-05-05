module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
    }],
  },
  overrides: [
    {
      files: ['./index.js'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      }
    },
    {
      files: ['tests/**/*.js'],
      env: {
        qunit: true
      }
    },
    {
      files: ['./index.js', 'addon-test-support/**/*.js', 'config/**/*.js'],
      plugins: [
        'disable-features',
      ],
      rules: {
        'disable-features/disable-async-await': 'error',
        'disable-features/disable-generator-functions': 'error',
      }
    },
  ]
};
