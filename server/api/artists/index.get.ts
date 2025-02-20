// https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { artistsIds } = getQuery(e);

		const res = await $spotify('/artists', { params: { ids: artistsIds } });

		return getSuccessResponse(200, 'Artists received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
