// https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { uris, position } = await readBody(e);

		const res = await $spotify(`/playlists/${playlistId}/tracks`, {
			method: 'POST',
			body: { uris, position },
		});

		return getSuccessResponse(201, 'Playlist item added', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
