// https://developer.spotify.com/documentation/web-api/reference/get-audio-features
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const trackId = getRouterParam(e, 'trackId');

		const res = await $spotify(`/audio-features/${trackId}`);

		return getSuccessResponse(200, 'Audio features received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
