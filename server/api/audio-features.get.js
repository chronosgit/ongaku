// https://developer.spotify.com/documentation/web-api/reference/get-several-audio-features
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { tracksIds } = getQuery(e);

		const res = await $spotify('/audio-features', {
			params: { ids: tracksIds },
		});

		return getSuccessResponse(200, 'Audio features received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
