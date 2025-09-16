import rxjs from '@smarttools/eslint-plugin-rxjs';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'src/framework/**/*', 
      'docs/**/*', 
      'packages-smoke/**/*', 
      'tools/dev-schematics/*/files',
      'dist/**/*',
      'node_modules/**/*'
    ],
  },
  ...compat
    .extends(
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'eslint-config-prettier',
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
    })),
  {
    files: ['**/*.ts'],

    plugins: {
      rxjs,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      quotes: 'off',
      'dot-notation': 'off',
      'no-restricted-globals': ['error', 'fit', 'fdescribe'],
      '@typescript-eslint/dot-notation': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/consistent-type-definitions': 'error',

      // Disable strict Angular modernization rules for playground
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',

      'rxjs/no-unsafe-takeuntil': [
        'error',
        {
          allow: [
            'count',
            'defaultIfEmpty',
            'endWith',
            'every',
            'finalize',
            'finally',
            'isEmpty',
            'last',
            'max',
            'min',
            'publish',
            'publishBehavior',
            'publishLast',
            'publishReplay',
            'reduce',
            'share',
            'shareReplay',
            'skipLast',
            'takeLast',
            'throwIfEmpty',
            'toArray',
          ],
        },
      ],
    },
  },
  ...compat.extends('plugin:@angular-eslint/template/recommended', 'eslint-config-prettier').map((config) => ({
    ...config,
    files: ['**/*.html'],
  })),
  {
    files: ['**/*.html'],
    rules: {
      // Disable strict template rules for playground
      '@angular-eslint/template/no-negated-async': 'off',
    },
  },
  {
    files: ['./*.js'],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 11,
      sourceType: 'commonjs',
    },
  },
];
