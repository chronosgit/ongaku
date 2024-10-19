// https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');

		const res = await $spotify(`/playlists/${playlistId}/followers/contains`);

		return getSuccessResponse(200, 'Check performed', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
