import type IArtistObject from '~/interfaces/business/artists/IArtistObject';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';
import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

interface IFetchMyTopItems<T> extends IServerApiSuccessResponse {
	data: {
		href: string;
		limit: number;
		next?: string | null;
		offset: number;
		previous?: string | null;
		total: number;
		items: T[]; // IArtistObject[] | ITrackObject[]
	};
}

export default class UsersService {
	static async fetchMyTopItems<T extends 'artists' | 'tracks'>(
		type: T,
		time_range?: string,
		limit?: number,
		offset?: number
	): Promise<
		IFetchMyTopItems<T extends 'artists' ? IArtistObject : ITrackObject>
	> {
		try {
			const res = await $fetch<
				IFetchMyTopItems<T extends 'artists' ? IArtistObject : ITrackObject>
			>(`/api/me/top/${type}`, {
				params: { time_range, limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}
