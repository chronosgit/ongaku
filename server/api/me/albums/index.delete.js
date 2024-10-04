// https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { albumsIds } = await readBody(e);

		await $spotify('/me/albums', {
			method: 'DELETE',
			body: { ids: albumsIds },
		});

		return getSuccessResponse(204, 'Albums deleted');
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
