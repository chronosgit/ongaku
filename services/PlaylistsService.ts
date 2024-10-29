import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

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

	static async updatePlaylistNameOrDescr(
		playlistId: string,
		name?: string,
		descr?: string
	) {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}`, {
				method: 'PUT',
				body: { name, description: descr },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async deletePlaylist(playlistId: string) {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}/followers`, {
				method: 'DELETE',
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}
