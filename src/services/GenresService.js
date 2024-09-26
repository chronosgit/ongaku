import axiosPrivate from '@/http/axiosPrivate';

class GenresService {
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
