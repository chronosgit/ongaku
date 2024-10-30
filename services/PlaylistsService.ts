import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
import type IPlaylistTrackObject from '~/interfaces/business/playlists/IPlaylistTrackObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

interface IFetchItems<T> extends IServerApiSuccessResponse {
	data: {
		href: string;
		limit: number;
		next?: string | null;
		offset: number;
		previous?: string | null;
		total: number;
		items: T[];
	};
}

interface IFetchPlaylist extends IServerApiSuccessResponse {
	data: IPlaylistObject;
}

interface ICreateNewPlaylistForUser extends IServerApiSuccessResponse {
	data: IPlaylistObject;
}

export default class PlaylistsService {
	static async fetchPlaylist(playlistId: string) {
		try {
			const res = await $fetch<IFetchPlaylist>(`/api/playlists/${playlistId}`);

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async fetchPlaylistItems(
		playlistId: string,
		fields?: string,
		limit?: number,
		offset?: number
	) {
		try {
			const res = await $fetch<IFetchItems<IPlaylistTrackObject>>(
				`/api/playlists/${playlistId}/tracks`,
				{
					params: { fields, limit, offset },
				}
			);

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async fetchFollowedPlaylists(limit?: number, offset?: number) {
		try {
			const res = await $fetch<IFetchItems<ISimplifiedPlaylistObject>>(
				'/api/me/playlists',
				{
					params: { limit, offset },
				}
			);

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
			} =
				await $fetch<IFetchItems<ISimplifiedPlaylistObject>>(
					'/api/me/playlists'
				);

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

	static async addCustomPlaylistCoverImage(playlistId: string, base64: string) {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}/images`, {
				method: 'PUT',
				body: { image: JSON.stringify(base64) },
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
