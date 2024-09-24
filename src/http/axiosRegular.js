import axios from 'axios';

const axiosRegular = axios.create({
	baseURL: import.meta.env?.VITE_SPOTIFY_API,
	timeout: 2000,
});

export default axiosRegular;
