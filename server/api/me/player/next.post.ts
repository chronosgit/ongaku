// https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-next-track
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId } = await readBody(e);

		const res = await $spotify('/me/player/next', {
			method: 'POST',
			body: { device_id: deviceId },
		});

		return getSuccessResponse(200, 'Track was skipped to next', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
