export default defineNuxtPlugin((nuxtApp) => {
	const {
		public: { spotifyApiBaseUrl },
	} = useRuntimeConfig();

	const spotifyApi = $fetch.create({
		baseURL: spotifyApiBaseUrl,
		onRequest: (req, options, err) => {
			const token = localStorage.getItem('access_token');

			console.log(localStorage);

			if (false) {
				const headers = (options.headers ||= {});

				if (Array.isArray(headers)) {
					headers.push(['Authorization', `Bearer ${session.value?.token}`]);
				} else if (headers instanceof Headers) {
					headers.set('Authorization', `Bearer ${session.value?.token}`);
				} else {
					headers.Authorization = `Bearer ${session.value?.token}`;
				}
			}
		},
		async onResponseError({ res }) {
			console.log(res.error);
		},
	});

	return {
		provide: {
			spotifyApi,
		},
	};
});
