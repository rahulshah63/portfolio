// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
	site: 'https://rahul-shah.com.np',
	integrations: [sitemap()],
	markdown: {
		// Code blocks follow the site theme; colors are switched in global.css.
		shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false },
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Source Serif 4',
			cssVariable: '--font-serif',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/source-serif-4.woff2'], weight: '200 900', style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/source-serif-4-italic.woff2'], weight: '200 900', style: 'italic', display: 'swap' },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Geist',
			cssVariable: '--font-sans',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/geist.woff2'], weight: '100 900', style: 'normal', display: 'swap' },
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Geist Mono',
			cssVariable: '--font-mono',
			fallbacks: ['ui-monospace', 'monospace'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/geist-mono.woff2'], weight: '100 900', style: 'normal', display: 'swap' },
				],
			},
		},
	],
});
