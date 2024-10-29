import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default defineNuxtRouteMiddleware((to) => {
	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();

	const isDirectedTo404Page = to.fullPath.includes(localePath('/not-found'));
	const isDirectedToAuthPage = to.fullPath.includes(localePath('/auth'));

	if (isDirectedTo404Page || isDirectedToAuthPage) return;

	if (!curUserStore.isAuthenticated) {
		return navigateTo(localePath('/auth'));
	}
});
