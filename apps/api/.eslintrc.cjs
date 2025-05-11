/** @format */

module.exports = {
  root: false, // Inherit from root config
  env: {
    node: true,
    es6: true,
  },
  extends: ['../../.eslintrc.cjs'], // Extend the root config
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json', // Relative to this directory
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
      },
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
        'plugin:node/recommended',
      ],
      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'ignore',
            ts: 'ignore',
          },
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              // Example backend architecture restrictions
              {
                target: './src/services',
                from: './src/controllers',
                message: 'Services should not import from controllers',
              },
              {
                target: './src/models',
                from: ['./src/controllers', './src/routes'],
                message: 'Models should not import from controllers or routes',
              },
            ],
          },
        ],
        'node/no-unsupported-features/es-syntax': 'off', // Allow ESM with TypeScript
        'node/no-missing-import': 'off', // TypeScript handles this
        // Allow console.log in backend for logging purposes
        'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
        // Disallow process.exit() as it can crash the server unexpectedly
        'no-process-exit': 'error',
        // Use a consistent return style for middleware
        'consistent-return': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },

    {
      files: ['**/routes/**/*.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
