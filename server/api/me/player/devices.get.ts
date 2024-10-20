// https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;

		const res = await $spotify('/me/player/devices');

		return getSuccessResponse(200, 'Devices received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
