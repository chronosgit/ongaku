// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, offset } = getQuery(e);

		const res = await $spotify('/me/tracks', { params: { limit, offset } });

		return getSuccessResponse(200, 'Tracks received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
