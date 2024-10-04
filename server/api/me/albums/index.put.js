export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { albumsIds } = await readBody(e);

		const res = await $spotify('/me/albums', {
			method: 'PUT',
			body: { ids: albumsIds },
		});

		return getSuccessResponse(200, 'Albums saved', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
