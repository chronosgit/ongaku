// https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { fields, limit, offset, additionalTypes } = getQuery(e);

		const res = await $spotify(`/playlists/${playlistId}/tracks`, {
			params: { fields, limit, offset, additional_types: additionalTypes },
		});

		return getSuccessResponse(200, 'Tracks received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
