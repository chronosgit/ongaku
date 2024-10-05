// https://developer.spotify.com/documentation/web-api/reference/check-users-saved-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { tracksIds } = getQuery(e);

		const res = await $spotify('/me/tracks/contains', {
			params: { ids: tracksIds },
		});

		return getSuccessResponse(200, 'Check performed', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
