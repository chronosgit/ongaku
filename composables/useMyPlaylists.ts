import { useCurrentUserStore } from '~/store/useCurrentUserStore';
import type { FCreateToast } from './useToasts';

interface UpdatePlaylistPayload {
	name?: string;
	descr?: string;
}

export default function () {
	const createToast = inject('createToast') as FCreateToast;

	const { t } = useI18n();

	const { imageBase64, updateImage, deleteImage } = useAddImageClient();

	const createNewPlaylist = async (
		isPublic: boolean = true,
		collaborative: boolean = false
	) => {
		const { user } = useCurrentUserStore();

		if (!user) {
			console.error('Current user is not defined');
			return;
		}

		try {
			const now = new Date();
			const dt = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}.${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

			const res = await $fetch(`/api/users/${user.id}/playlists`, {
				method: 'POST',
				body: {
					name: `Playlist_${dt}`,
					public: isPublic,
					collaborative,
					description: '',
				},
			});

			createToast({
				id: generateRandomString(),
				message: t('modules.sidebar-library.toasts.success-create-playlist'),
				type: 'success',
				lifespan: 3000,
			});

			return res;
		} catch (err) {
			console.error(err);

			return err;
		}
	};

	const updateMyPlaylist = async (
		playlistId: string,
		payload: UpdatePlaylistPayload
	) => {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}`, {
				method: 'PUT',
				body: {
					name: payload.name,
					description: payload.descr,
					public: true,
					collaborative: false,
				},
			});

			if (imageBase64.value === '') return res;
			else if (getStringSizeInKBClient(imageBase64.value) > 256) {
				console.error('Base64 image size must not exceed 256 KB');
				return res;
			}

			$fetch(`/api/playlists/${playlistId}/images`, {
				method: 'PUT',
				body: {
					image: imageBase64.value.slice(imageBase64.value.indexOf(',') + 1),
				},
			});

			deleteImage();

			return res;
		} catch (err) {
			console.error(err);

			throw err;
		}
	};

	const deleteMyPlaylist = async (playlistId: string) => {
		try {
			const res = await $fetch(`/api/playlists/${playlistId}/followers`, {
				method: 'DELETE',
			});

			return res;
		} catch (err) {
			console.error(err);

			throw err;
		}
	};

	return {
		imageBase64,
		updateImage,
		deleteImage,
		createNewPlaylist,
		updateMyPlaylist,
		deleteMyPlaylist,
	};
}
