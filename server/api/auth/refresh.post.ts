import ErrorNames from '~/server/enums/ErrorNames';
import HttpMethods from '~/server/enums/HttpMethods';

interface IRequestPayload {
	method: HttpMethods.POST;
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded';
	};
	body: URLSearchParams;
}

interface IResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}

export default defineEventHandler(async (e) => {
	try {
		const refreshToken = getCookie(e, 'refresh_token');

		if (!refreshToken) {
			throw createError({
				name: ErrorNames.TOKEN,
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'Refresh token was not sent',
			});
		}

		const {
			public: { spotifyAuthClientId },
		} = useRuntimeConfig();

		const payload: IRequestPayload = {
			method: HttpMethods.POST,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: spotifyAuthClientId,
			}),
		};

		const { access_token, refresh_token, expires_in } = await $fetch<IResponse>(
			'https://accounts.spotify.com/api/token',
			payload as unknown as {}
		);

		setCookie(e, 'access_token', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: expires_in || 3600, // def: 1h
			path: '/',
		});

		if (refresh_token) {
			setCookie(e, 'refresh_token', refresh_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/',
			});
		}

		return getSuccessResponse(200, 'Token were refreshed');
	} catch (err) {
		handleErrorResponse(err);
	}
});
