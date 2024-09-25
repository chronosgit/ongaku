import { createRouter, createWebHistory } from 'vue-router';
import { i18n } from '@/main';
import SpotifyAuthRedirect from '@/pages/spotify-auth-redirect/SpotifyAuthRedirect.vue';
import Home from '@/pages/home/Home.vue';
import NotFound from '@/pages/not-found/NotFound.vue';
import isValidUrlBeforeEach from './guards/isValidUrlBeforeEach';
import trackLocaleBeforeEach from './guards/trackLocaleBeforeEach';
import pageTitleBeforeEach from './guards/pageTitleBeforeEach';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/localization/i18n';

const routes = [
	{
		path: '/spotify/auth', // match the redirect_uri spotify auth path
		component: SpotifyAuthRedirect,
	},
	{
		path: '/:locale',
		component: Home,
	},
	{
		path: '/:locale/not-found',
		component: NotFound,
		meta: { title: 'not-found.page-title' },
	},

	// redirect to 404 page with correct locale
	{
		path: '/:pathMatch(.*)*',
		redirect: () => {
			const activeLocal = i18n.global.locale.value;

			if (SUPPORTED_LOCALES.includes(activeLocal)) {
				return `/${activeLocal}/not-found`;
			} else {
				return `/${DEFAULT_LOCALE}/not-found`;
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

// check if url has locale part in URL (eg. /en/posts/)
router.beforeEach(isValidUrlBeforeEach);

// lazy loading for locales
router.beforeEach(trackLocaleBeforeEach);

// dynamic page title
router.beforeEach(pageTitleBeforeEach);

export default router;
