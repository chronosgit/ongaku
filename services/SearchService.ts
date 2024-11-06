import type { SearchType } from '~/interfaces/business/search/SearchType';

class SearchService {
	static search(
		q: string,
		type: SearchType[],
		limit?: number,
		offset?: number
	) {
		return $fetch('/api/search', {
			params: {
				q: encodeURIComponent('a'),
				type: 'album',
				limit,
				offset,
			},
		});
	}
}

export default SearchService;
