<script setup lang="ts">
	import { IconCheck } from '~/components/ui/icons';
	import type IMediaItem from '../../../interfaces/IMediaItem';
	import AlbumsService from '~/services/AlbumsService';

	const { t } = useI18n();

	const album = inject<IMediaItem>('item');
	const createToast = inject<FCreateToast>('createToast', () => {});
	const removeAlbumLocally = inject<(albumId: string) => void>(
		'removeAlbumLocally',
		() => {}
	);

	const deleteSavedAlbum = async () => {
		try {
			if (album?.id == null) return;

			await AlbumsService.removeMySavedAlbums([album.id]);

			removeAlbumLocally(album.id);

			createToast({
				id: album?.id + new Date().toString(),
				type: 'success',
				message: t('toasts.albums.delete.success'),
				lifespan: 3000,
			});
		} catch (err) {
			console.error(err);

			createToast({
				id: album?.id + new Date().toString(),
				type: 'error',
				message: t('toasts.albums.delete.error'),
				lifespan: 3000,
			});
		}
	};
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="deleteSavedAlbum"
	>
		<div
			class="flex items-center justify-center rounded-full bg-green-500 p-0.5"
		>
			<ClientOnly>
				<IconCheck class="text-white" />
			</ClientOnly>
		</div>

		<p class="dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.delete-album') }}
		</p>
	</div>
</template>
