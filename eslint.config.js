import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'
import importX from 'eslint-plugin-import-x'

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier: eslintPluginPrettier,
            'import-x': importX,
        },
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        ignores: ['node_modules/**', 'dist/**', '**/eslint.config.js'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-expressions': [
                'error',
                { allowTaggedTemplates: true },
            ],
            'import-x/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'index',
                        'object',
                        'parent',
                        'sibling',
                        'type',
                    ],
                },
            ],
            ...importX.configs.recommended.rules,
            ...importX.configs.typescript.rules,
        },
        settings: {
            'import-x/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import-x/resolver': {
                node: true,
                typescript: {
                    alwaysTryTypes: true,
                    project: ['packages/task-queue/tsconfig.json'],
                },
            },
            'import-x/core-modules': ['bun:test'],
        },
    },
]
