import type IPlaylistTrackObject from '~/interfaces/business/playlists/IPlaylistTrackObject';
import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';

export default function (
	playlistId: string,
	playlistItem: IPlaylistTrackObject,
	playlistItemTrack: ITrackObject
): ITrackFeedItem {
	return {
		id: playlistItem.track.id,
		name: playlistItem.track.name,
		artists: playlistItemTrack.artists,
		images: playlistItemTrack.album.images,
		track_number: playlistItemTrack.track_number,
		added_at: playlistItem.added_at,
		duration_ms: playlistItem.track.duration_ms,
		uri: playlistItem.track.uri,
		type: 'track',
		context: {
			uri: `spotify:playlist:${playlistId}`,
			type: 'playlist',
			offset: { uri: playlistItem.track.uri },
		},
	};
}
