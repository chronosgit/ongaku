import { createRouter, createWebHistory } from 'vue-router';
import { i18n } from '@/main';
import Home from '@/modules/home/Home.vue';
import NotFound from '@/modules/not-found/NotFound.vue';
import SpotifyAuthRedirect from '@/common/components/SpotifyAuthRedirect.vue';
import isValidUrlBeforeEach from './guards/isValidUrlBeforeEach';
import trackLocaleBeforeEach from './guards/trackLocaleBeforeEach';
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

export default router;
