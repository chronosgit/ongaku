// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	routeRules: { '/auth/redirect': { ssr: false } },

	components: false,
	alias: {
		components: './components',
		layouts: './layouts',
		services: './services',
		store: './store',
	},

	runtimeConfig: {
		public: {
			spotifyAuthClientId: import.meta.env?.SPOTIFY_AUTH_CLIENT_ID,
			spotifyApiBaseUrl: import.meta.env?.SPOTIFY_API_BASE_URL,
			spotifyAuthRedirectUri: import.meta.env?.SPOTIFY_AUTH_REDIRECT_URI,
		},
	},

	modules: ['@nuxtjs/i18n', '@nuxt/content'],

	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	i18n: {
		vueI18n: './i18n.config.ts',
		baseUrl: 'http://localhost:3000/',
		strategy: 'prefix',
		lazy: true,
		langDir: 'locales',

		defaultLocale: 'en',
		locales: [
			{
				code: 'en',
				language: 'en-US',
				file: 'en.json',
			},
			{
				code: 'ru',
				language: 'ru-RU',
				file: 'ru.json',
			},
		],

		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
	},
});
