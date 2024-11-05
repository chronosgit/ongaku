import type IPlayHistoryObject from '~/interfaces/business/IPlayHistoryObject';
import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

export default class TracksService {
	static async fetchRecentlyPlayedTracks(
		limit?: number,
		after?: number,
		before?: number
	) {
		try {
			const res = await $fetch<
				IServerApiSuccessResponse<{
					href: string;
					limit: number;
					next: number;
					cursors: { after: string; before: string };
					total: number;
					items: IPlayHistoryObject[];
				}>
			>('/api/me/player/recently-played', {
				params: { limit, after, before },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async removeTrackFromPlaylist(
		playlistId: string,
		tracks: { uri: string }[]
	) {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}/tracks`, {
				method: 'DELETE',
				body: { tracks },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async addTrackToPlaylist(
		playlistId: string,
		uris: string[],
		position?: number
	) {
		return $fetch(`/api/playlists/${playlistId}/tracks`, {
			method: 'POST',
			body: { playlist_id: playlistId, uris, position },
		});
	}
}
