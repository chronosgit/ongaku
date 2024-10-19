// https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { locale, limit, offset } = getQuery(e);

		const res = await $spotify('/browse/featured-playlists', {
			params: { locale, limit, offset },
		});

		return getSuccessResponse(200, 'Playlists received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
