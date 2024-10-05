// https://developer.spotify.com/documentation/web-api/reference/search
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { q, type, limit, offset, includeExternal } = getQuery(e);

		const allowedTypes = [
			'album',
			'artist',
			'playlist',
			'track',
			'show',
			'episode',
			'audiobook',
		];

		if (!allowedTypes.includes(type)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid type',
			});
		}

		const res = await $spotify('/search', {
			params: { q, type, limit, offset, include_external: includeExternal },
		});

		return getSuccessResponse(200, 'Search results received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
