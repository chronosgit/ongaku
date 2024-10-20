import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware((to) => {
	const localePath = useLocalePath();
	const curUserStore = useCurrentUserStore();
	const isDirectedTo404Page = to.fullPath.includes('/not-found');

	if (isDirectedTo404Page) return;

	if (!curUserStore.isAuthenticated) {
		return navigateTo(localePath('/not-found'));
	}
});
