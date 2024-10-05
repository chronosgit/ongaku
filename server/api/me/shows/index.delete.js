// https://developer.spotify.com/documentation/web-api/reference/remove-shows-user
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { showsIds } = await readBody(e);

		const res = await $spotify('/me/shows', {
			method: 'DELETE',
			params: { ids: showsIds },
		});

		return getSuccessResponse(204, 'Shows removed', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
