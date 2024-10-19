// https://developer.spotify.com/documentation/web-api/reference/get-several-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { tracksIds } = getQuery(e);

		const res = await $spotify('/tracks', { params: { ids: tracksIds } });

		return getSuccessResponse(200, 'Tracks received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
