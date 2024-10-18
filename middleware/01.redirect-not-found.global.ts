export default defineNuxtRouteMiddleware(async (to) => {
	if (to.matched.length === 0 && to.path !== '/not-found') {
		return navigateTo('/not-found');
	}
});
