module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  settings: {
    react: { version: '18.3.1' },
  },
  ignorePatterns: ['dist/*', '.*.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', 'jsx-expressions', 'react-refresh', 'import', 'simple-import-sort', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'curly': ['warn', 'multi'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-extra-boolean-cast': ['error', { enforceForLogicalOperands: true }],
    'no-implicit-coercion': 'error',
    'quotes': ['error', 'single', { avoidEscape: true }],
    // https://stackoverflow.com/questions/52669325/only-arrow-functions-in-eslint
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    'react/jsx-key': 'error',
    'react/jsx-boolean-value': 'warn',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/button-has-type': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
    'jsx-expressions/strict-logical-expressions': 'error',
  },

  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [['^react', '^\\w', '^@\\w', '^@/\\w', '^\\u0000', '^', '^\\.', '^.+\\.?(css)$']],
          },
        ],
        'simple-import-sort/exports': 'error',
      },
    },
  ],
};
