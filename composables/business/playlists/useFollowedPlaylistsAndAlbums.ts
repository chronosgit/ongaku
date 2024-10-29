import AlbumsService from '~/services/AlbumsService';
import PlaylistsService from '~/services/PlaylistsService';

export default function () {
	const limit = ref(10);
	const offset = ref(0);

	const {
		data: followedPlaylistsAndAlbums,
		status,
		execute: fetchFollowedPlaylistsAndAlbums,
	} = useLazyAsyncData('useFollowedPlaylistsAndAlbums', async () => {
		try {
			// WARN: artifical delay
			await delay(1000);

			// Playlists
			const {
				data: { items: playlists },
			} = await PlaylistsService.fetchFollowedPlaylists(
				limit.value,
				offset.value
			);

			// Albums
			const res2 = await AlbumsService.fetchSavedAlbums(
				limit.value,
				offset.value
			);

			console.log(res2);

			return playlists;
		} catch (err) {
			console.error(err);

			return [];
		}
	});

	const areLoading = computed(() => status.value === 'pending');

	return {
		followedPlaylistsAndAlbums,
		areLoading,
		fetchFollowedPlaylistsAndAlbums,
	};
}
