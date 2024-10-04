// https://developer.spotify.com/documentation/web-api/reference/get-categories
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { locale, limit, offset } = getQuery(e);

		const res = await $spotify('/browse/categories', {
			params: { locale, limit, offset },
		});

		return getSuccessResponse(200, 'Categories received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
