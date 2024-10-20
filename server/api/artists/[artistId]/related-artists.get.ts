// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const artistId = getRouterParam(e, 'artistId');

		const res = await $spotify(`/artists/${artistId}/related-artists`);

		return getSuccessResponse(200, 'Artists received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
