// https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId, state } = await readBody(e);

		const res = await $spotify('/me/player/shuffle', {
			method: 'PUT',
			body: { device_id: deviceId, state },
		});

		return getSuccessResponse(200, 'Playback shuffle was toggled', { res });
	} catch (err) {
		handleErrorResponse(err);
	}
});
