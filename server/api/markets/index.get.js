// https://developer.spotify.com/documentation/web-api/reference/get-available-markets
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;

		const res = await $spotify('/markets');

		return getSuccessResponse(200, 'Markets received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
