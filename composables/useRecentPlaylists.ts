import type IExternalUrls from '~/interfaces/IExternalUrls';
import type IPlaylist from '~/interfaces/IPlaylist';

interface PlayHistoryObject {
	track: Object;
	played_at: string;
	context: {
		type: string;
		href: string;
		external_urls: IExternalUrls;
		uri: string;
	};
}

export default function () {
	const {
		data: recentPlaylists,
		status,
		execute: fetchRecentPlaylists,
	} = useLazyAsyncData<IPlaylist[]>(
		'getRecentPlaylists',
		async () => {
			try {
				// WARN: artifical delay
				await delay(1000);

				const res = await $fetch('/api/me/player/recently-played', {
					params: { limit: 50 },
				});

				const { items: pho } = res?.data as { items: PlayHistoryObject };

				const recentPlaylistsIds = new Set<string>();

				Object.values(pho).forEach((o) => {
					if (recentPlaylistsIds.size > 8) return;

					const ctx = o.context;

					if (ctx?.type !== 'playlist') return;

					const playlistId = ctx.uri.split(':')[2];

					recentPlaylistsIds.add(playlistId);
				});

				const playlists = await Promise.all(
					Array.from(recentPlaylistsIds).map(async (id) => {
						try {
							const res = await $fetch(`/api/playlists/${id}`);
							const ph = res?.data as IPlaylist;

							return ph;
						} catch (err) {
							throw err;
						}
					})
				);

				return playlists;
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{ immediate: false }
	);

	const isLoading = computed(() => status.value === 'pending');

	return { recentPlaylists, isLoading, fetchRecentPlaylists };
}
