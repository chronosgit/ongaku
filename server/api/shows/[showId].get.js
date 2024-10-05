// https://developer.spotify.com/documentation/web-api/reference/get-a-show
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const showId = getRouterParam(e, 'showId');

		const res = await $spotify(`/shows/${showId}`);

		return getSuccessResponse(200, 'Shows received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
