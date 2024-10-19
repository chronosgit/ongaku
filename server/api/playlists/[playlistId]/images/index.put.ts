// https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const base64EncodedJPEGImage = await readBody(e);

		const res = await $spotify(`/playlists/${playlistId}/images`, {
			method: 'PUT',
			body: base64EncodedJPEGImage,
		});

		return getSuccessResponse(200, 'Image updated', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
