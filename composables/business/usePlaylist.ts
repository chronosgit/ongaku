import type IImage from '~/interfaces/IImage';
import type IPlaylist from '~/pages/playlists/interfaces/IPlaylist';

export default function (playlistId: string) {
	const playlistOwnerAvatarUrl = ref<string | null>(null);
	const playlistLengthMs = ref<number | null>(null);

	const {
		data: playlist,
		status,
		execute: fetchPlaylist,
	} = useLazyAsyncData<IPlaylist | null>(
		'usePlaylist',
		async () => {
			try {
				const res = await $fetch(`/api/playlists/${playlistId}`, {
					params: {
						fields:
							'description,href,id,images,followers,name,owner,tracks,type,uri',
					},
				});
				const playlist = res?.data as IPlaylist;

				// Calculate playlist length
				const lengthMs = playlist.tracks.items.reduce((acc, cur) => {
					const { duration_ms } = cur.track as { duration_ms: number };

					return acc + duration_ms;
				}, 0);
				playlistLengthMs.value = lengthMs;

				// Get owner avatar async
				$fetch(`/api/users/${playlist.owner.id}`).then((owner) => {
					const { images } = (owner?.data as { images: IImage[] }) || [];

					if (images.length === 0) return;

					playlistOwnerAvatarUrl.value = images[images.length - 1].url;
				});

				return playlist;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false }
	);

	const isLoading = computed(() => status.value === 'pending');

	return {
		playlist,
		playlistOwnerAvatarUrl,
		playlistLengthMs,
		isLoading,
		fetchPlaylist,
	};
}
