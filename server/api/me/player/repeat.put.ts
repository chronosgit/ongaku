// https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback
import ErrorNames from '~/server/enums/ErrorNames';

export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { deviceId, state } = await readBody(e);

		const states = ['track', 'context', 'off'];

		if (!states.includes(state)) {
			throw createError({
				name: ErrorNames.BODY,
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'State must be track, context, or off',
			});
		}

		const res = await $spotify('/me/player/repeat', {
			method: 'PUT',
			body: { device_id: deviceId, state },
		});

		return getSuccessResponse(200, 'Repeat mode was set', { res });
	} catch (err) {
		handleErrorResponse(err);
	}
});
