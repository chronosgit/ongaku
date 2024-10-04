// https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { albumsIds } = getQuery(e);

		const res = await $spotify('/albums', { params: { ids: albumsIds } });

		return {
			success: true,
			statusCode: 200,
			statusMessages: 'Albums received',
			data: res,
		};
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
