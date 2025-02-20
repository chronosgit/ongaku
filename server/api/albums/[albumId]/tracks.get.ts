// https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const albumId = getRouterParam(e, 'albumId');

		const res = await $spotify(`/albums/${albumId}`);

		return getSuccessResponse(200, "Album's tracks received", res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
