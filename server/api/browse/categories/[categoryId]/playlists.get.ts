// https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const categoryId = getRouterParam(e, 'categoryId');
		const { limit, offset } = getQuery(e);

		const res = await $spotify(`/browse/categories/${categoryId}/playlists`, {
			params: { limit, offset },
		});

		return getSuccessResponse(200, 'Playlists received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
