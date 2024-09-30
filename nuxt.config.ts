import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path';

export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	components: false,
	alias: {
		'@components': resolve(__dirname, 'components'),
		'@store': resolve(__dirname, 'store'),
	},

	app: {
		head: {
			title: 'Ongaku - Web Player: Music for everyone',
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{
					name: 'description',
					content:
						'Ongaku is a digital music service that gives you access to millions of songs.',
				},
			],
		},
	},

	modules: [
		'@nuxtjs/tailwindcss', // Ensure the module is listed here
	],
	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
