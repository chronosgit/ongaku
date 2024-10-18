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
		const { code, codeVerifier } = await readBody(e);

		const {
			public: { spotifyAuthClientId, spotifyAuthRedirectUri },
		} = useRuntimeConfig();

		const payload: IRequestPayload = {
			method: HttpMethods.POST,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: spotifyAuthClientId,
				grant_type: 'authorization_code',
				code,
				redirect_uri: spotifyAuthRedirectUri,
				code_verifier: codeVerifier,
			}),
		};

		const { access_token, refresh_token, expires_in } = await $fetch<IResponse>(
			'https://accounts.spotify.com/api/token',
			payload as unknown as {}
		);

		if (!access_token || !refresh_token) {
			throw createError({
				name: ErrorNames.TOKEN,
				statusCode: 404,
				statusMessage: 'Tokens were not received',
				data: {},
			});
		}

		setCookie(e, 'access_token', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: expires_in || 3600, // def: 1h
			path: '/',
		});

		setCookie(e, 'refresh_token', refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30, // 30 days
			path: '/',
		});

		return getSuccessResponse(200, 'Tokens received');
	} catch (err) {
		handleErrorResponse(err);
	}
});
