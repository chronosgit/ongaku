// https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const trackId = getRouterParam(e, 'trackId');

		const res = await $spotify(`/audio-analysis/${trackId}`);

		return getSuccessResponse(200, 'Audio features received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
