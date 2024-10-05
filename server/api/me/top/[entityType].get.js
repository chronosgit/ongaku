// https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const entityType = getRouterParam(e, 'entityType');
		const { timeRange, limit, offset } = getQuery(e);

		const res = await $spotify(`/me/top/${entityType}`, {
			params: { time_range: timeRange, limit, offset },
		});

		return getSuccessResponse(200, 'Items received', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
