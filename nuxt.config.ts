export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	routeRules: { '/auth/redirect': { ssr: false } },

	components: false,
	alias: {
		components: './components',
		interfaces: './interfaces',
		layouts: './layouts',
		services: './services',
		store: './store',
	},

	imports: {
		dirs: ['composables', 'composables/**'],
	},

	plugins: [
		'~/plugins/01.manage-color-mode.client.ts',
		'~/plugins/02.i18n.ts',
		'~/plugins/03.spotify-sdk.client.js',
	],
	runtimeConfig: {
		public: {
			spotifyAuthClientId: import.meta.env?.SPOTIFY_AUTH_CLIENT_ID,
			spotifyApiBaseUrl: import.meta.env?.SPOTIFY_API_BASE_URL,
			spotifyAuthRedirectUri: import.meta.env?.SPOTIFY_AUTH_REDIRECT_URI,
		},
	},

	modules: [
		'@nuxtjs/i18n',
		'@nuxt/image',
		'@nuxt/icon',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxt/fonts',
	],

	fonts: {
		families: [{ name: 'Poppins', provider: 'google' }],
		display: 'swap',
	},

	css: ['~/assets/css/tailwind.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	image: {
		dir: 'assets/images',
		screens: {
			'sm': 640,
			'md': 768,
			'lg': 1024,
			'xl': 1280,
			'2xl': 1536,
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
