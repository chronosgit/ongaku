import UsersService from '~/services/UsersService';

export default function () {
	const {
		data: myTopArtists,
		status,
		execute: fetchMyTopArtists,
		refresh: refetchMyTopArtists,
	} = useLazyAsyncData(
		'useMyTopArtists',
		async () => {
			// WARN: artifical delay
			await delay(500);

			try {
				const {
					data: { items: myTopArtists },
				} = await UsersService.fetchMyTopItems('artists');

				return myTopArtists;
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{ immediate: false }
	);

	const areLoading = computed(() => status.value === 'pending');

	onMounted(() => fetchMyTopArtists());

	return {
		myTopArtists,
		areLoading,
		refetchMyTopArtists,
	};
}
