// https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { albumsIds } = getQuery(e);

		const res = await $spotify('/me/albums/contains', {
			params: { ids: albumsIds },
		});

		return getSuccessResponse(200, 'Response received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
