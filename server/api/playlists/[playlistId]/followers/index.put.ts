// https://developer.spotify.com/documentation/web-api/reference/follow-playlist
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { public: status } = await readBody(e);

		const res = await $spotify(`/playlists/${playlistId}/followers`, {
			method: 'PUT',
			body: { public: status },
		});

		return getSuccessResponse(200, 'Playlist followed', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
