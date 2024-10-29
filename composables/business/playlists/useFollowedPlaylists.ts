import PlaylistsService from '~/services/PlaylistsService';

export default function () {
	const limit = ref(20);
	const offset = ref(0);

	const {
		data: followedPlaylists,
		status,
		execute: fetchFollowedPlaylists,
	} = useLazyAsyncData(
		'useFollowedPlaylists',
		async () => {
			try {
				// WARN: artifical delay
				await delay(1000);

				const res = await PlaylistsService.fetchFollowedPlaylists(
					limit.value,
					offset.value
				);

				return res.data.items;
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{ immediate: false }
	);

	const areLoading = computed(() => status.value === 'pending');

	return { followedPlaylists, areLoading, fetchFollowedPlaylists };
}
