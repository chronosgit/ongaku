// https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback
// Watch out for body fields format, see the docs for more details
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId, play } = await readBody(e);

		const res = await $spotify('/me/player', {
			method: 'PUT',
			body: { device_ids: deviceId, play },
		});

		return getSuccessResponse(200, 'Playback state transferred', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
