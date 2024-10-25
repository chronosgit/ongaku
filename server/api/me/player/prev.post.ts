// https://developer.spotify.com/documentation/web-api/reference/skip-users-playback-to-previous-track
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId } = await readBody(e);

		const res = await $spotify('/me/player/previous', {
			method: 'POST',
			body: { device_id: deviceId },
		});

		return getSuccessResponse(200, 'Track was skipped to previous', { res });
	} catch (err) {
		handleErrorResponse(err);
	}
});
