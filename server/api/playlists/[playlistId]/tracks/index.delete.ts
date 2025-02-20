// https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist
// Clones are deleted too
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { tracks, snapshotId } = await readBody(e);

		const res = await $spotify(`/playlists/${playlistId}/tracks`, {
			method: 'DELETE',
			body: { tracks, snapshot_id: snapshotId },
		});

		return getSuccessResponse(204, 'Playlist items deleted', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
