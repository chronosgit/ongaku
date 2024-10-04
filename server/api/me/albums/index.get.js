export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, offset } = getQuery(e);

		const res = await $spotify('/me/albums', {
			params: { limit, offset },
		});

		return getSuccessResponse(200, 'My saved albums received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
