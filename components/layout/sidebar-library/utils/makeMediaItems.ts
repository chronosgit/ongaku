import type ISavedAlbumObject from '~/interfaces/business/albums/ISavedAlbumObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';
import isPlaylist from './isPlaylist';
import type IMediaItem from '../interfaces/IMediaItem';

export default function (
	items: (ISimplifiedPlaylistObject | ISavedAlbumObject)[]
) {
	return items.map((i) => {
		console.log(i);

		if (isPlaylist(i)) {
			return {
				id: i.id,
				name: i.name,
				descr: i.description,
				owners: [{ id: i.owner.id, name: i.owner.display_name }],
				image: Array.isArray(i.images) ? i.images[0] : null,
				type: 'playlist',
			} as IMediaItem;
		} else {
			const owners = i.album.artists.map((a) => ({ id: a.id, name: a.name }));

			return {
				id: i.album.id,
				name: i.album.name,
				descr: '',
				owners,
				image: Array.isArray(i.album.images) ? i.album.images[0] : null,
				type: 'album',
			} as IMediaItem;
		}
	});
}
