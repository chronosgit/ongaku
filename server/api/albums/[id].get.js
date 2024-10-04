export default defineEventHandler(async (e) => {
	try {
		const albumId = getRouterParam(e, 'id');
		const $spotify = e.context.spotify;

		const res = await $spotify(`/albums/${albumId}`);

		return {
			success: true,
			successCode: 200,
			statusMessage: '',
			data: res,
		};
	} catch (err) {
		console.error(err);

		throw createError({
			success: false,
			statusCode: 500,
			statusMessage: 'Something went wrong',
			data: {},
		});
	}
});
