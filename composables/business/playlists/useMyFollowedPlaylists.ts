import PlaylistsService from '~/services/PlaylistsService';

export default function () {
	const limit = ref(50);
	const offset = ref(0);

	const {
		data: playlists,
		status,
		execute,
	} = useAsyncData('useMyFollowedPlaylists', async () => {
		try {
			const {
				data: { items },
			} = await PlaylistsService.fetchFollowedPlaylists(
				limit.value,
				offset.value
			);

			return items ?? [];
		} catch (err) {
			console.error(err);

			return null;
		}
	});

	const areLoading = computed(() => status.value === 'pending');

	return {
		playlists,
		areLoading,
		refetchPlaylists: execute,
	};
}
