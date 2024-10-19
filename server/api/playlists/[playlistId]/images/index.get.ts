// https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');

		const res = await $spotify(`/playlists/${playlistId}/images`);

		return getSuccessResponse(200, 'Image received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
