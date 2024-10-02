import axiosPrivate from '@/http/axiosPrivate';

class GenresService {
	// https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
	static async getAvailableGenresSeeds() {
		try {
			const res = axiosPrivate.get('/recommendations/available-genre-seeds');

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default GenresService;
