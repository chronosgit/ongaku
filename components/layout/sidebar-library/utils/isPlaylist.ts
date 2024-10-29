import type ISavedAlbumObject from '~/interfaces/business/albums/ISavedAlbumObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

export default function (
	item: ISimplifiedPlaylistObject | ISavedAlbumObject
): item is ISimplifiedPlaylistObject {
	return (item as ISimplifiedPlaylistObject).type === 'playlist';
}
