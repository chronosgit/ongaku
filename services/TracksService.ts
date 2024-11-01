import type IPlayHistoryObject from '~/interfaces/business/IPlayHistoryObject';
import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

interface IFetchRecentlyPlayedTracks extends IServerApiSuccessResponse {
	data: {
		href: string;
		limit: number;
		next: number;
		cursors: { after: string; before: string };
		total: number;
		items: IPlayHistoryObject[];
	};
}

export default class TracksService {
	static async fetchRecentlyPlayedTracks(
		limit?: number,
		after?: number,
		before?: number
	) {
		try {
			const res = await $fetch<IFetchRecentlyPlayedTracks>(
				'/api/me/player/recently-played',
				{
					params: { limit, after, before },
				}
			);

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
}
