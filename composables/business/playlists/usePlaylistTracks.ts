import type IEpisodeObject from '~/interfaces/business/episodes/IEpisodeObject';
import type IPlaylistTrackObject from '~/interfaces/business/playlists/IPlaylistTrackObject';
import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';
import PlaylistsService from '~/services/PlaylistsService';

export default function (playlistId: string) {
	const limit = ref(30);
	const offset = ref(0);

	const {
		data: playlistTracks,
		status,
		execute: fetchPlaylistTracks,
		refresh: refetchPlaylistTracks,
	} = useLazyAsyncData(
		'usePlaylistTracks',
		async () => {
			try {
				const {
					data: { items },
				} = await PlaylistsService.fetchPlaylistItems(
					playlistId,
					'',
					limit.value,
					offset.value
				);

				return items;
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{ immediate: false }
	);

	const areLoading = computed(() => status.value === 'pending');

	const isTrack = (
		item: ITrackObject | IEpisodeObject
	): item is ITrackObject => {
		if (item.type === 'track') return true;

		return false;
	};

	onMounted(() => fetchPlaylistTracks());

	return {
		playlistTracks,
		areLoading,
		refetchPlaylistTracks,
		isTrack,
	};
}
