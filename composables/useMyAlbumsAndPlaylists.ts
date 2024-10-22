import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';
import type IMyAlbum from '~/interfaces/IMyAlbum';
import type ISimplifiedPlaylist from '~/interfaces/ISimplifiedPlaylist';

export default function () {
	const items = ref<IMediaAlbumOrPlaylist[]>([]);

	const filter = ref<'album' | 'playlist' | null>(null);

	const offset = ref(0);
	const limit = 10;

	const {
		data: allItems,
		status,
		execute: fetch,
	} = useLazyAsyncData(
		'useMyAlbumsAndPlaylists',
		async () => {
			try {
				await delay(2000);

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

	const selectOnlyAlbums = () => (filter.value = 'album');
	const selectOnlyPlaylists = () => (filter.value = 'playlist');

	watch([allItems, filter], (newValues) => {
		const newAllItems = newValues[0];
		const newFilter = newValues[1];

		if (newAllItems == null) {
			items.value = [];
			return;
		}

		if (newFilter == null) {
			items.value = newAllItems;
			return;
		}

		items.value = newAllItems.filter((i) => i.type === newFilter);

		console.log(items.value);
	});

	return {
		items,
		isLoading,
		filter,
		fetch,
		selectOnlyAlbums,
		selectOnlyPlaylists,
	};
}
