import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default function () {
	const createNewPlaylist = async (
		isPublic: boolean = true,
		collaborative: boolean = false
	) => {
		const { user } = useCurrentUserStore();

		if (!user) {
			console.error('Curren user is not defined');
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

			return res;
		} catch (err) {
			console.error(err);

			return err;
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

	return { createNewPlaylist, deleteMyPlaylist };
}
