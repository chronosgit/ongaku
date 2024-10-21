import type IMyAlbum from '~/interfaces/IMyAlbum';
import type ISimplifiedPlaylist from '~/interfaces/ISimplifiedPlaylist';

type CombinedMedia = ISimplifiedPlaylist | IMyAlbum;

export default function () {
	const offset = ref(0);
	const limit = 10;

	const {
		data: items,
		status,
		execute: fetch,
	} = useLazyAsyncData(
		'useMyAlbumsAndPlaylists',
		async () => {
			try {
				// Getting my playlists
				const r1 = await $fetch('/api/me/playlists', {
					params: { limit, offset: offset.value },
				});
				const { items: myPlaylists } = r1?.data as {
					items: ISimplifiedPlaylist[];
				};

				// Getting my albums
				const r2 = await $fetch('/api/me/albums', {
					params: { limit, offset: offset.value },
				});
				const { items: myAlbums } = r2?.data as { items: IMyAlbum[] };

				// TODO: combine with a custom type and adapt UI
				return [];
			} catch (err) {
				console.error(err);

				throw err;
			}
		},
		{
			immediate: false,
		}
	);

	const isLoading = computed(() => status.value === 'pending');

	return { items, isLoading, fetch };
}
