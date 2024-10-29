import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type ISimplifiedInterfaceObject from '~/interfaces/ISimplifiedPlaylistObject';

interface IFetchFollowedPlaylist extends IServerApiSuccessResponse {
	data: {
		href: string;
		limit: number;
		next?: string | null;
		offset: number;
		previous?: string | null;
		total: number;
		items: ISimplifiedInterfaceObject[];
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
