// https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { albumsIds } = getQuery(e);

		const res = await $spotify('/albums', { params: { ids: albumsIds } });

		return getSuccessResponse(200, 'Albums received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
