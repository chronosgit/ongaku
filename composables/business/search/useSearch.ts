import SearchService from '~/services/SearchService';
import type { SearchType } from '~/interfaces/business/search/SearchType';

export default function (q: string, type: SearchType[]) {
	const { data, status } = useAsyncData('useSearch', async () => {
		try {
			const res = await SearchService.search(q, type);

			console.log(res);

			return res;
		} catch (err) {
			console.error(err);

			return null;
		}
	});

	const isLoading = computed(() => status.value === 'pending');

	return { data, isLoading };
}
