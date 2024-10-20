// https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { limit, offset } = getQuery(e);

		const res = await $spotify('/me/playlists', { params: { limit, offset } });

		return getSuccessResponse(200, 'Playlists received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
