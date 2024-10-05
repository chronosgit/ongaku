// https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const userId = getRouterParam(e, 'userId');
		const { limit, offset } = getQuery(e);

		const res = await $spotify(`/users/${userId}/playlists`, {
			params: { limit, offset },
		});

		return getSuccessResponse(200, 'Playlists received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
