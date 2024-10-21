import type IPlaylist from '~/interfaces/IPlaylist';

interface IFetchResponse {
	href: string;
	items: IPlaylist[];
	total: number;
	limit: number;
	offset: number;
	next: string | null;
	previous: string | null;
}

export default function () {
	const {
		data: myPlaylists,
		status,
		execute: fetchMyPlaylists,
	} = useLazyAsyncData<IPlaylist[]>(
		'useMyPlaylists',
		async () => {
			try {
				// WARN: artifical delay
				await delay(2000);

				const res = await $fetch('/api/me/playlists');

				if (res == null) {
					console.warn('Nothing returned from the fetch');
					return [];
				}

				const data = res?.data as IFetchResponse;

				return data.items ?? [];
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{ immediate: false }
	);

	const isPlaylistsLoading = computed(() => status.value === 'pending');

	onMounted(() => fetchMyPlaylists());

	return { myPlaylists, isPlaylistsLoading };
}
