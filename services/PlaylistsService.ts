import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

interface IFetchFollowedPlaylists extends IServerApiSuccessResponse {
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

interface ICreateNewPlaylistForUser extends IServerApiSuccessResponse {
	data: IPlaylistObject;
}

export default class PlaylistsService {
	static async fetchFollowedPlaylists(limit?: number, offset?: number) {
		try {
			const res = await $fetch<IFetchFollowedPlaylists>('/api/me/playlists', {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async createNewPlaylistForUser(
		userId: string,
		namePrefix = 'Playlist_'
	) {
		try {
			const {
				data: { total },
			} = await $fetch<IFetchFollowedPlaylists>('/api/me/playlists');

			const name = `${namePrefix}${Number(total) + 1}`;

			const res = await $fetch<ICreateNewPlaylistForUser>(
				`/api/users/${userId}/playlists`,
				{
					method: 'POST',
					body: { name },
				}
			);

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
