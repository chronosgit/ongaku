// https://developer.spotify.com/documentation/web-api/reference/check-users-saved-shows
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { showsIds } = getQuery(e);

		const res = await $spotify('/me/shows/contains', {
			params: { ids: showsIds },
		});

		return getSuccessResponse(200, 'Check performed', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
