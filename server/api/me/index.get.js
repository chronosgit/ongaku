// https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;

		const res = await $spotify('/me');

		return getSuccessResponse(200, 'User received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
