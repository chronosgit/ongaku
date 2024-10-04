export default defineEventHandler(async (e) => {
	try {
		const albumId = getRouterParam(e, 'id');
		const $spotify = e.context.spotify;

		const res = await $spotify(`/albums/${albumId}`);

		return {
			success: true,
			successCode: 200,
			statusMessage: 'Albums received',
			data: res,
		};
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
