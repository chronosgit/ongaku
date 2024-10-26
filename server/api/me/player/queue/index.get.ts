// https://developer.spotify.com/documentation/web-api/reference/get-queue
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;

		const res = await $spotify('/me/player/queue');

		return getSuccessResponse(200, 'Received my playback queue', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
