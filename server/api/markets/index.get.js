export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;

		const res = await $spotify('/markets');

		return getSuccessResponse(200, 'Markets received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
