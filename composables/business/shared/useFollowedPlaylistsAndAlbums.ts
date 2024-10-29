import AlbumsService from '~/services/AlbumsService';
import PlaylistsService from '~/services/PlaylistsService';
import type ISavedAlbumObject from '~/interfaces/business/albums/ISavedAlbumObject';
import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';
import isPlaylist from '~/components/layout/sidebar-library/utils/isPlaylist';

export default function () {
	const { t } = useI18n();

	const createToast = inject<FCreateToast>('createToast', () => {});

	const limit = ref(10);
	const offset = ref(0);

	const {
		data: followedPlaylistsAndAlbums,
		status,
		execute: fetchFollowedPlaylistsAndAlbums,
		refresh: refetchFollowedPlaylistsAndAlbums,
	} = useLazyAsyncData('useFollowedPlaylistsAndAlbums', async () => {
		try {
			// WARN: artifical delay
			await delay(1000);

			// Playlists
			const {
				data: { items: playlists },
			} = await PlaylistsService.fetchFollowedPlaylists(
				limit.value,
				offset.value
			);

			// Albums
			const {
				data: { items: albums },
			} = await AlbumsService.fetchSavedAlbums(limit.value, offset.value);

			const media: (ISimplifiedPlaylistObject | ISavedAlbumObject)[] =
				playlists.concat(albums.filter((a) => a != null));

			return media;
		} catch (err) {
			console.error(err);

			return [];
		}
	});

	const removePlaylistLocally = (playlistId: string) => {
		if (followedPlaylistsAndAlbums.value == null) return;

		const targetId = followedPlaylistsAndAlbums.value.findIndex((i) => {
			if (!isPlaylist(i)) return false;

			return i.id === playlistId;
		});

		if (targetId === -1) {
			console.error(`Couldn't remove playlist with id ${playlistId} locally`);
			return;
		}

		createToast({
			id: playlistId,
			type: 'success',
			message: t('modules.sidebar-library.toasts.success-delete-playlist'),
			lifespan: 3000,
		});

		followedPlaylistsAndAlbums.value.splice(targetId, 1);
	};

	const editPlaylistLocally = async (
		playlistId: string,
		newName: string,
		newDescr: string
	) => {
		try {
			if (followedPlaylistsAndAlbums.value == null) return;

			const target = followedPlaylistsAndAlbums.value.find((i) => {
				if (!isPlaylist(i)) return false;

				return i.id === playlistId;
			});

			if (target == null) {
				console.error(`Couldn't edit playlist with id ${playlistId} locally`);
				return;
			}

			if (isPlaylist(target)) {
				target.name = newName ?? target.name;
				target.description = newDescr ?? target.description;
			} else {
				target.album.name = newName ?? target.album.name;
			}

			createToast({
				id: playlistId,
				type: 'success',
				message: t('modules.sidebar-library.toasts.success-update-playlist'),
				lifespan: 3000,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const areLoading = computed(() => status.value === 'pending');

	return {
		followedPlaylistsAndAlbums,
		areLoading,
		fetchFollowedPlaylistsAndAlbums,
		refetchFollowedPlaylistsAndAlbums,
		removePlaylistLocally,
		editPlaylistLocally,
	};
}
