export default defineNitroPlugin(() => {
	const {
		public: { spotifyApiBaseUrl },
	} = useRuntimeConfig();

	const spotifyApi = $fetch.create({
		baseURL: spotifyApiBaseUrl,
		onRequest({ req, options, err }) {
			// console.log(req);
			// if (session.value?.token) {
			// 	const headers = (options.headers ||= {});
			// 	if (Array.isArray(headers)) {
			// 		headers.push(['Authorization', `Bearer ${session.value?.token}`]);
			// 	} else if (headers instanceof Headers) {
			// 		headers.set('Authorization', `Bearer ${session.value?.token}`);
			// 	} else {
			// 		headers.Authorization = `Bearer ${session.value?.token}`;
			// 	}
			// }
		},
		async onResponseError({ res }) {
			console.error(res);
		},
	});

	return { provide: { spotifyApi } };
});
