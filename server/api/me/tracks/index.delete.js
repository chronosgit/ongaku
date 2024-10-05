// https://developer.spotify.com/documentation/web-api/reference/remove-tracks-user
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { tracksIds } = await readBody(e);

		const res = await $spotify('/me/tracks', {
			method: 'DELETE',
			body: { ids: tracksIds },
		});

		return getSuccessResponse(204, 'Tracks removed', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
