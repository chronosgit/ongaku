// https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');

		const res = await $spotify(`/playlists/${playlistId}/followers`, {
			method: 'DELETE',
		});

		return getSuccessResponse(204, 'Playlist unfollowed', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
