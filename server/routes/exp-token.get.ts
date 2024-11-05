export default defineEventHandler(async (e) => {
	try {
		const accessToken = getCookie(e, 'access_token');

		return getSuccessResponse(200, 'Received token', accessToken);
	} catch (err) {
		handleErrorResponse(err);
	}
});
