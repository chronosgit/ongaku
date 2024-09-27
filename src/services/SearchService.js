import axiosPublic from '@/http/axiosPublic';

class SearchService {
	// https://developer.spotify.com/documentation/web-api/reference/search.
	// searchQuery - string (REQUIRED)
	// type - array[string] (REQUIRED)
	// limit - integer (def: 20, min: 1, max: 50)
	// offset - integer (def: 0)
	// includeExternal - string (def: externally hosted audio is unplayable)
	static async searchForItem(
		searchQuery,
		type,
		limit,
		offset,
		includeExternal
	) {
		try {
			const res = axiosPublic.get('/search');

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default SearchService;
