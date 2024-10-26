export default defineEventHandler(async (e) => {
	try {
		setCookie(e, 'access_token', '', {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			expires: new Date(0),
		});

		setCookie(e, 'refresh_token', '', {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			expires: new Date(0),
		});

		return getSuccessResponse(204, 'Removed tokens');
	} catch (err) {
		handleErrorResponse(err);
	}
});
