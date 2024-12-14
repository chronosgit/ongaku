import type { SearchType } from '~/interfaces/business/search/SearchType';
import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';

class SearchService {
	static search(
		q: string,
		type: SearchType[],
		limit?: number,
		offset?: number
	) {
		return $fetch<IServerApiSuccessResponse<unknown>>('/api/search', {
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
