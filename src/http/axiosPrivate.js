import AuthService from '@/services/AuthService';
import axios from 'axios';

const axiosPrivate = axios.create({
	baseURL: import.meta.env?.VITE_SPOTIFY_API,
	timeout: 2000,
});

axiosPrivate.interceptors.request.use((config) => {
	const authHeader = config.headers['Authorization'];

	if (!authHeader) {
		const accessToken = localStorage.getItem('access_token');

		config.headers.Authorization = 'Bearer ' + accessToken;
	}

	return config;
});

axiosPrivate.interceptors.response.use(
	(response) => {
		return Promise.resolve(response);
	},
	(error) => {
		const config = error.config;
		const errStatus = error.status;

		if (errStatus !== 401) return Promise.reject(error);

		/* 401. Bad or expired token.
		 * If the user revoked a token or the access token has expired.
		 * Re-authenticate the user.
		 */
		if (config._retry) return Promise.reject(error);

		AuthService.refreshTokens()
			.then((res) => {
				const newAccessToken = res.access_token;

				config.headers['Authorization'] = 'Bearer ' + newAccessToken;
				config._retry = true;

				return axiosPrivate(config);
			})
			.catch((err) => console.error(err));
	}
);

export default axiosPrivate;
