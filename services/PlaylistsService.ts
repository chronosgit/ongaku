import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
import type IPlaylistTrackObject from '~/interfaces/business/playlists/IPlaylistTrackObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

export default class PlaylistsService {
	static async fetchPlaylist(playlistId: string) {
		try {
			const res = await $fetch<IServerApiSuccessResponse<IPlaylistObject>>(
				`/api/playlists/${playlistId}`
			);

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
			const res = await $fetch<
				IServerApiSuccessResponse<IPlaylistTrackObject[]>
			>(`/api/playlists/${playlistId}/tracks`, {
				params: { fields, limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async fetchFollowedPlaylists(limit?: number, offset?: number) {
		try {
			const res = await $fetch<
				IServerApiSuccessResponse<{ items: ISimplifiedPlaylistObject[] }>
			>('/api/me/playlists', {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async checkIfCurUserFollowsPlaylist(playlistId: string) {
		try {
			const res = await $fetch<IServerApiSuccessResponse<boolean[]>>(
				`/api/playlists/${playlistId}/followers/contains`
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
			} = await $fetch<
				IServerApiSuccessResponse<{
					href: string;
					limit: number;
					next?: string | null;
					offset: number;
					previous?: string | null;
					total: number;
					items: ISimplifiedPlaylistObject[];
				}>
			>('/api/me/playlists');

			const name = `${namePrefix}${Number(total) + 1}`;

			const res = await $fetch<IServerApiSuccessResponse<IPlaylistObject>>(
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

	static async followPlaylist(playlistId: string, isPublic = true) {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}/followers`, {
				method: 'PUT',
				body: { public: isPublic },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async unfollowPlaylist(playlistId: string) {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}/followers`, {
				method: 'DELETE',
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
