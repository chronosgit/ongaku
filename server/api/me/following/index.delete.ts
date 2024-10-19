// https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { artistType, artistsIds } = await readBody(e);

		const res = $spotify('/me/following', {
			method: 'DELETE',
			params: { type: artistType },
			body: { ids: artistsIds },
		});

		return getSuccessResponse(204, 'Unfollowed', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
