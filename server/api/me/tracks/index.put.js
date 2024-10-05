// https://developer.spotify.com/documentation/web-api/reference/save-tracks-user
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { tracksIds } = await readBody(e);

		const res = await $spotify('/me/tracks', {
			method: 'PUT',
			body: { ids: tracksIds },
		});

		return getSuccessResponse(200, 'Tracks saved', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
