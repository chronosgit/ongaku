import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type ISimplifiedPlaylistObject from '~/interfaces/ISimplifiedPlaylistObject';

interface IFetchFollowedPlaylist extends IServerApiSuccessResponse {
	data: {
		href: string;
		limit: number;
		next?: string | null;
		offset: number;
		previous?: string | null;
		total: number;
		items: ISimplifiedPlaylistObject[];
	};
}

export default class PlaylistsService {
	static async fetchFollowedPlaylists(limit?: number, offset?: number) {
		try {
			const res = await $fetch<IFetchFollowedPlaylist>('/api/me/playlists', {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}
