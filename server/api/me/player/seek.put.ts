// https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
import ErrorNames from '~/server/enums/ErrorNames';

export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId, positionMs } = await readBody(e);

		if (positionMs < 0) {
			throw createError({
				name: ErrorNames.BODY,
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'Position in ms must be positive',
			});
		}

		const res = await $spotify('/me/player/seek', {
			method: 'PUT',
			body: { device_id: deviceId, position_ms: positionMs },
		});

		return getSuccessResponse(200, 'Track was skipped to previous', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
