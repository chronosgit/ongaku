// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const artistId = getRouterParam(e, 'artistId');

		const res = await $spotify(`/artists/${artistId}/top-tracks`);

		return getSuccessResponse(200, 'Top tracks received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
