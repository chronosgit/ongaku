import type IPlaylistTrackObject from '~/interfaces/business/playlists/IPlaylistTrackObject';
import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';

export default function (
	playlistId: string,
	playlistItem: IPlaylistTrackObject,
	playlistItemTrack: ITrackObject,
	isContextOwnership = false
): ITrackFeedItem {
	return {
		id: playlistItem.track.id,
		name: playlistItem.track.name,
		album: {
			id: playlistItemTrack.album.id,
			name: playlistItemTrack.album.name,
			uri: playlistItemTrack.album.uri,
			external_urls: playlistItemTrack.album.external_urls,
		},
		artists: playlistItemTrack.artists,
		images: playlistItemTrack.album.images,
		track_number: playlistItemTrack.track_number,
		added_at: playlistItem.added_at,
		duration_ms: playlistItem.track.duration_ms,
		uri: playlistItem.track.uri,
		type: 'track',
		context: {
			id: playlistId,
			uri: `spotify:playlist:${playlistId}`,
			type: 'playlist',
			offset: { uri: playlistItem.track.uri },
			is_ownership: isContextOwnership,
		},
	};
}
