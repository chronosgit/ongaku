export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { artistsIds } = getQuery(e);

		const res = await $spotify('/artists', { params: { ids: artistsIds } });

		return getSuccessResponse(200, 'Artists received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
