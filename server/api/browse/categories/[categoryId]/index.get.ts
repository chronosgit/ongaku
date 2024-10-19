// https://developer.spotify.com/documentation/web-api/reference/get-a-category
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const categoryId = getRouterParam(e, 'categoryId');
		const { locale } = getQuery(e);

		const res = await $spotify(`/browse/categories/${categoryId}`, {
			params: { locale },
		});

		return getSuccessResponse(200, 'Category received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
