export default defineEventHandler((e) => {
	try {
		const a = useNuxtApp();
		const albumId = getRouterParam(e, 'id');

		console.log(a);
		return {
			success: true,
			successCode: 200,
			sucessMessage: '',
			data: {},
		};

		const res = $spotifyApi(`/albums/${albumId}`).catch((e) => {
			throw e;
		});

		return {
			success: true,
			successCode: 200,
			sucessMessage: '',
			data: {},
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
