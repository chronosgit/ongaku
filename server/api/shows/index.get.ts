// https://developer.spotify.com/documentation/web-api/reference/get-multiple-shows
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { showsIds } = getQuery(e);

		const res = await $spotify('/shows', { params: { ids: showsIds } });

		return getSuccessResponse(200, 'Shows received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
