import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default function () {
	const curUserStore = useCurrentUserStore();

	useAsyncData('useMyProfile', async () => {
		try {
			const res = await curUserStore.authenticate();

			return res;
		} catch (err) {
			console.error(err);

			return null;
		}
	});

	return {};
}
