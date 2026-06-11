import { config as paperless } from '@paperless/conventions/eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { parser as eslintParserTypeScript } from 'typescript-eslint';

export default defineConfig([
	...paperless(import.meta.dirname),
	{
		rules: {
			'unicorn/no-keyword-prefix': 'off',
			'better-tailwindcss/enforce-consistent-line-wrapping': [
				'error',
				{
					indent: 'tab',
				},
			],
		},
		settings: {
			'import/ignore': ['@prismicio/client'],
			'better-tailwindcss': {
				entryPoint: 'src/styles.css',
				tsconfig: 'tsconfig.json',
			},
		},
	},
	{
		files: ['**/*.{ts,tsx,cts,mts}'],
		languageOptions: {
			parser: eslintParserTypeScript,
		},
	},

	{
		files: ['**/*.{jsx,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
	},
	globalIgnores([
		// Default ignores of eslint-config-next:
		'dist/**',
		'src/routeTree.gen.ts',
	]),
]);
