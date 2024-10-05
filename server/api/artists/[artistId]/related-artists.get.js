export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const artistId = getRouterParam(e, 'artistId');

		const res = await $spotify(`/artists/${artistId}/related-artists`);

		return getSuccessResponse(200, 'Artists received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
