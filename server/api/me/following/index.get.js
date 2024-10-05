// https://developer.spotify.com/documentation/web-api/reference/get-followed
// Pay attention to 'after' query param, see docs for more details
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { artistType, after, limit } = getQuery(e);

		const res = await $spotify('/me/following', {
			params: { type: artistType, after, limit },
		});

		return getSuccessResponse(200, 'Artists received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
