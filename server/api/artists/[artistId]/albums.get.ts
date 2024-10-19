// https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const artistId = getRouterParam(e, 'artistId');
		const { includeGroups, limit, offset } = getQuery(e);

		const res = await $spotify(`/artists/${artistId}/albums`, {
			params: { include_groups: includeGroups, limit, offset },
		});

		return getSuccessResponse(200, 'Albums received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
