export default defineEventHandler(async (e) => {
	try {
		const { code, codeVerifier } = await readBody(e);

		const {
			public: { spotifyAuthClientId, spotifyAuthRedirectUri },
		} = useRuntimeConfig();

		const payload = {
			method: 'POST',
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

		const { access_token, refresh_token, expires_in } = await $fetch(
			'https://accounts.spotify.com/api/token',
			payload
		);

		if (!access_token || !refresh_token) {
			throw createError({
				success: false,
				statusCode: 404,
				statusMessage: 'Tokens were not found',
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
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
