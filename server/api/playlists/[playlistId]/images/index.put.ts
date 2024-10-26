import ErrorNames from '~/server/enums/ErrorNames';

// https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { image } = await readBody(e);

		if (!image) {
			throw createError({
				name: ErrorNames.BODY,
				statusCode: 400,
				statusMessage: 'Bad request',
				message: 'Invalid body',
			});
		}

		const res = await $spotify(`/playlists/${playlistId}/images`, {
			method: 'PUT',
			body: image,
		});

		return getSuccessResponse(200, 'Image updated', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
