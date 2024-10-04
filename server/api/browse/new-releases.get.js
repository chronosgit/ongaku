// https://developer.spotify.com/documentation/web-api/reference/get-new-releases
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, offset } = getQuery(e);

		const res = await $spotify('/browse/new-releases', {
			params: { limit, offset },
		});

		return getSuccessResponse(200, 'Albums received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
