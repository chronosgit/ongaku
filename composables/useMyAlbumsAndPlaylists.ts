import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';
import type IMyAlbum from '~/interfaces/IMyAlbum';
import type ISimplifiedPlaylist from '~/interfaces/ISimplifiedPlaylist';

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
				await delay(3000);

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
				const { items: myAlbums } = r2?.data as { items: any[] };

				// Combining into one
				const mediaItems: IMediaAlbumOrPlaylist[] = [];

				myPlaylists.forEach((p) =>
					mediaItems.push({
						id: p.id,
						name: p.name,
						type: 'playlist',
						owner: p.owner.display_name,
						image: p.images[0],
					})
				);

				myAlbums
					.filter((a) => a != null)
					.forEach((a) => {
						const album = a.album as IMyAlbum;

						mediaItems.push({
							id: album.id,
							name: album.name,
							type: 'album',
							owner: album.artists[0].name,
							image: album.images[0],
						});
					});

				return mediaItems;
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
