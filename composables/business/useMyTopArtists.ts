import type IArtist from '~/interfaces/IArtist';
import type IExternalUrls from '~/interfaces/IExternalUrls';
import type IImage from '~/interfaces/IImage';

export default function () {
	const limit = ref(8);
	const offset = ref(0);

	const {
		data: myTopArtists,
		status,
		execute: fetchMyTopArtists,
	} = useLazyAsyncData(
		'useMyTopArtists',
		async () => {
			try {
				const res = await $fetch(`/api/me/top/artists`, {
					params: {
						artistType: 'artist',
						limit: limit.value,
						offset: offset.value,
					},
				});

				if (res == null) return [];

				const { items } = res.data as { items: IArtist[] };

				return items;
			} catch (err) {
				console.error(err);

				return [];
			}
		},
		{
			immediate: false,
		}
	);

	const isLoading = computed(() => status.value === 'pending');

	return { myTopArtists, isLoading, fetchMyTopArtists };
}
