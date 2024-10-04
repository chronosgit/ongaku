export default defineEventHandler((e) => {
	const {
		public: { spotifyApiBaseUrl },
	} = useRuntimeConfig();
	const accessToken = getCookie(e, 'access_token');

	const spotifyFetch = $fetch.create({
		baseURL: spotifyApiBaseUrl,
		headers: {
			Authorization: `Bearer ${accessToken || ''}`,
		},
	});

	e.context.spotify = spotifyFetch;
});
