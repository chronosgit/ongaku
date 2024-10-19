// https://developer.spotify.com/documentation/web-api/reference/change-playlist-details
// Watch out for 'collaborative' feild, read docs for details
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const {
			name,
			public: status,
			collaborative,
			description,
		} = await readBody(e);

		const res = await $spotify(`/playlists/${playlistId}`, {
			method: 'PUT',
			body: { name, public: status, collaborative, description },
		});

		return getSuccessResponse(200, 'Playlist updated', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
