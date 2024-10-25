// https://developer.spotify.com/documentation/web-api/reference/add-to-queue
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { uri, deviceId } = await readBody(e);

		const res = await $spotify('/me/player/queue', {
			method: 'POST',
			body: { uri, device_id: deviceId },
		});

		return getSuccessResponse(200, 'Updated my playback queue', { res });
	} catch (err) {
		handleErrorResponse(err);
	}
});
