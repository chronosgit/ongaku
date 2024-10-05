// https://developer.spotify.com/documentation/web-api/reference/save-shows-user
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { showsIds } = await readBody(e);

		const res = await $spotify('/me/shows', {
			method: 'PUT',
			params: { ids: showsIds },
		});

		return getSuccessResponse(200, 'Shows saved', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
