export default function () {
	const { data: recentPlaylists, execute: fetchRecentPlaylists } =
		useLazyAsyncData(
			'getRecentPlaylists',
			async () => {
				try {
					// TODO: server-side player API

					return [1, 2, 3];
				} catch (err) {
					console.error(err);

					return err;
				}
			},
			{ immediate: false }
		);

	return { recentPlaylists, fetchRecentPlaylists };
}
