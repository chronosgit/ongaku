// https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { additionalTypes } = getQuery(e);

		const res = await $spotify('/me/player/currently-playing', {
			params: { additional_types: additionalTypes },
		});

		return getSuccessResponse(200, 'Currently playing received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
