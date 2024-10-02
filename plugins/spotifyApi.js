export default defineNuxtPlugin((nuxtApp) => {
	const {
		public: { spotifyApiBaseUrl },
	} = useRuntimeConfig();

	const spotifyApi = $fetch.create({
		baseURL: spotifyApiBaseUrl,
		onRequest: (req, options, err) => {
			console.log(req, options, err);
		},
		async onResponseError({ res }) {
			console.error(res.status);
		},
	});

	return {
		provide: {
			spotifyApi,
		},
	};
});
