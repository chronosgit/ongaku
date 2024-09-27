import axiosPrivate from '@/http/axiosPrivate';

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
			if (!searchQuery) throw Error('Search query must be valid');

			const allowedTypes = [
				'album',
				'artist',
				'playlist',
				'track',
				'show',
				'episode',
				'audiobook',
			];

			if (!allowedTypes.includes(type)) {
				throw Error('Type must be valid');
			}

			const res = axiosPrivate.get('/search', {
				params: {
					q: searchQuery,
					type,
					limit,
					offset,
					include_external: includeExternal,
				},
			});

			return res;
		} catch (err) {
			throw err;
		}
	}
}

export default SearchService;
