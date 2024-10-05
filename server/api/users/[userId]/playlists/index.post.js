// https://developer.spotify.com/documentation/web-api/reference/create-playlist
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const userId = getRouterParam(e, 'userId');
		const {
			name,
			public: status,
			collaborative,
			description,
		} = await readBody(e);

		const res = await $spotify(`/users/${userId}/playlists`, {
			method: 'POST',
			body: { name, public: status, collaborative, description },
		});

		return getSuccessResponse(201, 'Playlist created', res);
	} catch (err) {
		console.error(err);

		throw createError(getErrorOptions(err));
	}
});
