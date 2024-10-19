export default defineNuxtRouteMiddleware(async (to) => {
	const localePath = useLocalePath();

	if (to.matched.length === 0 && to.path !== '/not-found') {
		return navigateTo(localePath('/not-found'));
	}
});
