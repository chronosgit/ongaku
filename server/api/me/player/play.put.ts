// https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const body = await readBody(e);

		const { contextUri, uris, offset, positionMs } = body;

		const res = await $spotify('/me/player/play', {
			method: 'PUT',
			body: { context_uri: contextUri, uris, offset, position_ms: positionMs },
		});

		return getSuccessResponse(200, 'Devices received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
