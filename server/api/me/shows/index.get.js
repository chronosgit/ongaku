// https://developer.spotify.com/documentation/web-api/reference/get-users-saved-shows
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, offset } = getQuery(e);

		const res = await $spotify('/me/shows', { params: { limit, offset } });

		return getSuccessResponse(200, 'Shows received', res);
	} catch (err) {
		console.error(err);

		throw createError(err);
	}
});
