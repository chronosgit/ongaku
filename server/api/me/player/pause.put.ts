// https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId } = await readBody(e);

		const res = await $spotify('/me/player/pause', {
			method: 'PUT',
			body: { device_id: deviceId },
		});

		return getSuccessResponse(200, 'Playback was paused', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
