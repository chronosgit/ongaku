import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

interface IFetchSavedAlbums extends IServerApiSuccessResponse {
	data: {
		// href: string;
		// limit: number;
		// next?: string | null;
		// offset: number;
		// previous?: string | null;
		// total: number;
		// items: ISimplifiedInterfaceObject[];
	};
}

export default class AlbumsService {
	static async fetchSavedAlbums(limit?: number, offset?: number) {
		try {
			const res = await $fetch('/api/me/albums', { params: { limit, offset } });

			return res;
		} catch (err) {
			throw err;
		}
	}
}
