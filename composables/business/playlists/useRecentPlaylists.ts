import TracksService from '~/services/TracksService';
import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
import PlaylistsService from '~/services/PlaylistsService';

export default function () {
	const {
		data: recentPlaylists,
		status,
		execute: fetchRecentPlaylists,
		refresh: refetchRecentPlaylists,
	} = useLazyAsyncData<IPlaylistObject[]>(
		'useRecentPlaylists',
		async () => {
			try {
				// WARN: artifical delay
				await delay(700);

				const {
					data: { items: recentlyPlayedTracks },
				} = await TracksService.fetchRecentlyPlayedTracks(50);

				const recentPlaylistIds = recentlyPlayedTracks
					.sort((a, b) => {
						const dateA = new Date(a.played_at).getTime();
						const dateB = new Date(b.played_at).getTime();

						return dateB - dateA;
					})
					.map(({ context }) => {
						return context.type === 'playlist'
							? context.href.split('/playlists/')[1]
							: undefined;
					})
					.filter((i) => i != null);

				const uniqueIds = Array.from(new Set(recentPlaylistIds)).slice(0, 8);

				const fetchPromises = uniqueIds.map((id) =>
					PlaylistsService.fetchPlaylist(id)
				);

				const res = await Promise.all(fetchPromises);
				const playlists = res.map((p) => p.data);

				return playlists;
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{ immediate: false }
	);

	onMounted(() => fetchRecentPlaylists());

	const areLoading = computed(() => status.value === 'pending');

	return {
		recentPlaylists,
		areLoading,
		fetchRecentPlaylists,
		refetchRecentPlaylists,
	};
}
