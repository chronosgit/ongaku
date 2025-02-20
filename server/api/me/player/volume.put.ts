// https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
import ErrorNames from '~/server/enums/ErrorNames';

export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const body = await readBody(e);

		if (body == null) {
			throw createError({
				name: ErrorNames.BODY,
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'Invalid body',
			});
		}

		const { deviceId, volumePercent } = body;

		if (
			typeof volumePercent !== 'number' ||
			volumePercent < 0 ||
			volumePercent > 100
		) {
			throw createError({
				name: ErrorNames.BODY,
				statusCode: 400,
				statusMessage: 'Bad request',
				message:
					'Volume percent must be a number between 0 and 100 inclusively',
			});
		}

		const res = await $spotify('/me/player/volume', {
			method: 'PUT',
			body: { device_id: deviceId },
			params: { volume_percent: volumePercent },
		});

		return getSuccessResponse(200, 'Playback volume was set', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
