// https://developer.spotify.com/documentation/web-api/reference/get-an-album
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const albumId = getRouterParam(e, 'id');

		const res = await $spotify(`/albums/${albumId}`);

		return getSuccessResponse(200, 'Albums received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
