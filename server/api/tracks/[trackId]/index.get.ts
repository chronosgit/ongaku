// https://developer.spotify.com/documentation/web-api/reference/get-track
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const trackId = getRouterParam(e, 'trackId');

		const res = await $spotify(`/tracks/${trackId}`);

		return getSuccessResponse(200, 'Track received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
