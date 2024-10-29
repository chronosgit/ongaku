import makeMediaItems from '../utils/makeMediaItems';
import type ISavedAlbumObject from '~/interfaces/business/albums/ISavedAlbumObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

export default function (
	followedPlaylistsAndAlbums: Ref<
		(ISimplifiedPlaylistObject | ISavedAlbumObject)[] | null
	>
) {
	const filter = ref<'playlist' | 'album' | null>(null);

	const items = computed(() => {
		if (followedPlaylistsAndAlbums.value == null) return [];

		const mediaItems = makeMediaItems(followedPlaylistsAndAlbums.value);

		const filteredMediaItems = mediaItems.filter(
			(i) => filter.value == null || i.type === filter.value
		);

		return filteredMediaItems;
	});

	const filterByPlaylists = () => (filter.value = 'playlist');
	const filterByAlbums = () => (filter.value = 'album');
	const deselectFilter = () => (filter.value = null);

	return { filter, items, filterByPlaylists, filterByAlbums, deselectFilter };
}
