module.exports = {
  root: false, // Inherit from root config
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['../../.eslintrc.cjs'], // Extend the root config
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json', // Relative to this directory
      },
      settings: {
        react: { version: 'detect' },
        'import/resolver': {
          typescript: {
            project: './tsconfig.json',
          },
        },
      },
      extends: [
        'plugin:jsx-a11y/recommended',
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:tailwindcss/recommended',
        'plugin:vitest/legacy-recommended',
      ],
      rules: {
        'no-param-reassign': ['error', { props: false }],
        'tailwindcss/no-contradicting-classname': 'off',
        'tailwindcss/no-custom-classname': [
          'warn',
          {
            whitelist: ['data-\\[.*\\]:.+'],
          },
        ],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'ignore',
            jsx: 'ignore',
            ts: 'ignore',
            tsx: 'ignore',
          },
        ],
        'react/jsx-props-no-spreading': [
          'off',
          {
            html: 'ignore',
            custom: 'enforce',
            explicitSpread: 'ignore',
          },
        ],
        'react/require-default-props': [
          'error',
          {
            functions: 'defaultArguments',
          },
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              // disables cross-feature imports
              {
                target: './src/features/appointment-tasks',
                from: './src/features',
                except: ['./appointment-tasks', './shared'],
              },
              {
                target: './src/features/calender',
                from: './src/features',
                except: ['./calender', './shared'],
              },

              // enforce unidirectional codebase
              {
                target: './src/features',
                from: './src/app',
              },
              {
                target: [
                  './src/components',
                  './src/hooks',
                  './src/lib',
                  './src/types',
                  './src/utils',
                ],
                from: ['./src/features', './src/app'],
              },
            ],
          },
        ],
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      },
    },

    {
      files: ['**/routes/**/*.{ts,tsx}'],
      rules: {
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },

    {
      //Shadcn specific rules
      files: ['src/components/ui/**/*.{ts,tsx}'],
      rules: {
        'import/prefer-default-export': 'off', // Disabling the rule here so shadCn can do barrel export
        '@typescript-eslint/no-shadow': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
};
