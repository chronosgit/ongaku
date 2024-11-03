import type IArtistObject from '~/interfaces/business/artists/IArtistObject';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';
import type IUserProfile from '~/interfaces/business/users/IUserProfile';
import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

export default class UsersService {
	static async fetchUserProfile(userId: string) {
		try {
			const res = await $fetch<IServerApiSuccessResponse<IUserProfile>>(
				`/api/users/${userId}`
			);

			return res;
		} catch (err) {
			throw err;
		}
	}

	static async fetchMyTopItems<T extends 'artists' | 'tracks'>(
		type: T,
		time_range?: string,
		limit?: number,
		offset?: number
	): Promise<
		IServerApiSuccessResponse<{
			href: string;
			limit: number;
			next?: string | null;
			offset: number;
			previous?: string | null;
			total: number;
			items: T extends 'artists' ? IArtistObject : ITrackObject[];
		}>
	> {
		try {
			const res = await $fetch<
				IServerApiSuccessResponse<{
					href: string;
					limit: number;
					next?: string | null;
					offset: number;
					previous?: string | null;
					total: number;
					items: T extends 'artists' ? IArtistObject : ITrackObject[];
				}>
			>(`/api/me/top/${type}`, {
				params: { time_range, limit, offset },
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}
