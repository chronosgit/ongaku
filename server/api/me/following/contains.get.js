// https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { artistType, artistsIds } = getQuery(e);

		const res = await $spotify('/me/following/contains', {
			params: { type: artistType, ids: artistsIds },
		});

		return getSuccessResponse(200, 'Check performed', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
