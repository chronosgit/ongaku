import type ISavedAlbumObject from '~/interfaces/business/albums/ISavedAlbumObject';
import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

export default class AlbumsService {
	static async fetchSavedAlbums(limit?: number, offset?: number) {
		try {
			const res = await $fetch<
				IServerApiSuccessResponse<{
					href: string;
					limit: number;
					next?: string | null;
					offset: number;
					previous?: string | null;
					total: number;
					items: ISavedAlbumObject[] | null[];
				}>
			>('/api/me/albums', {
				params: { limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async removeMySavedAlbums(albumsIds: string[]) {
		try {
			const res = await $fetch('/api/me/albums', {
				method: 'DELETE',
				body: { albumsIds },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}
