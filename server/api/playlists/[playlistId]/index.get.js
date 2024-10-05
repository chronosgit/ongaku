export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { fields, additionalTypes } = getQuery(e);

		const res = await $spotify(`/playlists/${playlistId}`, {
			params: { fields, additional_types: additionalTypes },
		});

		return getSuccessResponse(200, 'Playlist received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
