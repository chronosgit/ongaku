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

		return {
			success: true,
			statusCode: 200,
			statusMessage: 'Token were refreshed',
			data: {},
		};
	} catch (err) {
		if (err.statusCode === 400) {
			throw createError({
				success: false,
				statusCode: 400,
				statusMessage: 'Bad request',
				data: {},
			});
		}

		throw createError({
			success: false,
			statusCode: 500,
			statusMessage: 'Something went wrong',
			data: {},
		});
	}
});
