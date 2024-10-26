import type { FCreateToast } from '../useToasts';

export default function () {
	const { t } = useI18n();

	const createToast = inject('createToast') as FCreateToast;

	const removeAlbumFromLibrary = async (albumId: string) => {
		try {
			const res = await $fetch('/api/me/albums', {
				method: 'DELETE',
				body: { albumsIds: [albumId] },
			});

			createToast({
				id: generateRandomString(),
				message: t('modules.sidebar-library.toasts.success-remove-album'),
				type: 'success',
				lifespan: 3000,
			});

			return res;
		} catch (err) {
			console.error(err);

			throw err;
		}
	};

	return { removeAlbumFromLibrary };
}
