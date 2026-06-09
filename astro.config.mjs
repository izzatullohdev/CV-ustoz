// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: 'https://oydinniso-nasirdinova.uz',
	trailingSlash: 'always',
	i18n: {
		defaultLocale: 'uz',
		locales: ['uz', 'ru', 'en'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: false,
		},
	},
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			dedupe: ['react', 'react-dom'],
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			fs: {
				// Project path contains ":" (e.g. "shaxzod : Komoldin aka") which Vite
				// treats as disallowed on macOS even when the folder is in fs.allow.
				strict: false,
				allow: [__dirname],
			},
		},
	},
	integrations: [react(), mdx(), sitemap()],
});