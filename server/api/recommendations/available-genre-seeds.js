export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;

		const res = await $spotify('/recommendations/available-genre-seeds');

		return getSuccessResponse(200, 'Genre seeds received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
