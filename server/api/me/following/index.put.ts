// https://developer.spotify.com/documentation/web-api/reference/follow-artists-users
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { artistType, artistsIds } = await readBody(e);

		const res = await $spotify('/me/following', {
			method: 'PUT',
			params: { type: artistType },
			body: { ids: artistsIds },
		});

		return getSuccessResponse(200, 'Followed', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
