import js from '@eslint/js'
import globals from 'globals'

import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  // Ignore build output
  {
    ignores: ['dist'],
  },

  // Base JS rules
  js.configs.recommended,

  prettier,
  // TypeScript + React files
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },

    rules: {
      // TypeScript recommended (inline, not spread)
      ...tseslint.configs.recommended.rules,

      // Vite / React Refresh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // side effects
            ['^react', '^@?\\w'], // react & libs
            ['^@/'], // absolute aliases
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // parent imports
            ['^\\./(?=.*/)', '^\\.(?!/?$)', '^\\./?$'], // relative
            ['^.+\\.?(css|scss|sass)$'], // styles last
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Import hygiene
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',

      // TypeScript quality
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]
