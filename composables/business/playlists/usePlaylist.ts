import PlaylistsService from '~/services/PlaylistsService';
import UsersService from '~/services/UsersService';

export default function (playlistId: string) {
	const playlistOwnerAvatar = ref<string | null>(null);
	const playlistDurationMs = ref<number | null>(null);

	const {
		data: playlist,
		status,
		execute: fetchPlaylist,
		refresh: refetchPlaylist,
	} = useLazyAsyncData(
		'usePlaylist',
		async () => {
			try {
				const { data: thePlaylist } =
					await PlaylistsService.fetchPlaylist(playlistId);

				// Async getting playlist owner info
				UsersService.fetchUserProfile(thePlaylist.owner.id).then((res) => {
					const avatars = res.data.images;

					if (!Array.isArray(avatars) || !avatars.length) {
						playlistOwnerAvatar.value = null;
						return;
					}

					playlistOwnerAvatar.value = avatars[avatars.length - 1].url;
				});

				// Calculating the playlist's duration in milliseconds
				const itsDurationInMs = thePlaylist.tracks.items.reduce((acc, i) => {
					return acc + Number(i.track.duration_ms);
				}, 0);
				playlistDurationMs.value = itsDurationInMs;

				return thePlaylist;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false }
	);

	const isLoading = computed(() => status.value === 'pending');

	onMounted(() => fetchPlaylist());

	return {
		playlist,
		playlistOwnerAvatar,
		playlistDurationMs,
		isLoading,
		refetchPlaylist,
	};
}
