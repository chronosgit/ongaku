import SearchService from '~/services/SearchService';
import type { SearchType } from '~/interfaces/business/search/SearchType';

export default function (q: string, type: SearchType[]) {
	const { data, status } = useAsyncData<{ id: string; nmae: string }[] | null>(
		'useSearch',
		async () => {
			try {
				const res = await SearchService.search(q, type);
				if (res == null || res.data == null) return;

				// @ts-ignore
				const albums = res.data.albums.items;

				return albums;
			} catch (err) {
				console.error(err);

				return null;
			}
		}
	);

	const isLoading = computed(() => status.value === 'pending');

	return { data, isLoading };
}
