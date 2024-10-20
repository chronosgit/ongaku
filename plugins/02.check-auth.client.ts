import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default defineNuxtPlugin(async () => {
	const curUserStore = useCurrentUserStore();

	if (!curUserStore.isAuthenticated) return;

	curUserStore.authenticate();
});
