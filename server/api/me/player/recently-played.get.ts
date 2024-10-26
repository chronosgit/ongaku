// https://developer.spotify.com/documentation/web-api/reference/get-recently-played
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, after, before } = getQuery(e);

		const res = await $spotify('/me/player/recently-played', {
			params: { limit, after, before },
		});

		return getSuccessResponse(200, 'Received recently played tracks', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
