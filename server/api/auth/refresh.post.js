export default defineEventHandler(async (e) => {
	try {
		const refreshToken = getCookie(e, 'refresh_token');

		const {
			public: { spotifyAuthClientId },
		} = useRuntimeConfig();

		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: spotifyAuthClientId,
			}),
		};

		const { access_token, refresh_token, expires_in } = await $fetch(
			'https://accounts.spotify.com/api/token',
			payload
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
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
