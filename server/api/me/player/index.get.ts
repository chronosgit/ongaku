// https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const { additionalTypes } = getQuery(e);

		// Returns undefined if playback is inactive
		const res = await $spotify('/me/player', {
			method: 'GET',
			params: { additional_types: additionalTypes },
		});

		return getSuccessResponse(200, 'Playback state received', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
