// https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks
export default defineEventHandler(async (e) => {
	try {
		const $spotify = e.context.spotify;
		const playlistId = getRouterParam(e, 'playlistId');
		const { rangeStart, rangeLength, insertBefore, uris, snapshotId } =
			await readBody(e);

		const res = await $spotify(`/playlists/${playlistId}/tracks`, {
			method: 'PUT',
			body: {
				range_start: rangeStart,
				range_length: rangeLength,
				insert_before: insertBefore,
				uris,
				snapshot_id: snapshotId,
			},
		});

		return getSuccessResponse(200, 'Playlist items reordered/replaced', res);
	} catch (err) {
		handleErrorResponse(err);
	}
});
