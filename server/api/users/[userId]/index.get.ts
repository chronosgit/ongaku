// https://developer.spotify.com/documentation/web-api/reference/get-users-profile
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const userId = getRouterParam(e, 'userId');

		const res = await $spotify(`/users/${userId}`);

		return getSuccessResponse(200, 'User received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
