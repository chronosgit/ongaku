export default defineEventHandler(async (e) => {
	const { accessToken, refreshToken, accessTokenExpiresIn } = await readBody(e);

	setCookie(e, 'access_token', accessToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: accessTokenExpiresIn || 60 * 60,
		path: '/',
	});

	setCookie(e, 'refresh_token', refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30, // 30 days
		path: '/',
	});

	return {
		statusCode: 200,
		success: true,
		message: 'Tokens received, cookies sent.',
		data: {},
	};
});
