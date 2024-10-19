// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, offset } = getQuery(e);

		const res = await $spotify('/me/albums', {
			params: { limit, offset },
		});

		return getSuccessResponse(200, 'Albums received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
