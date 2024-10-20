// https://developer.spotify.com/documentation/web-api/reference/get-an-artist
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const artistId = getRouterParam(e, 'artistId');

		const res = await $spotify(`/artists/${artistId}`);

		return getSuccessResponse(200, 'Artist received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
