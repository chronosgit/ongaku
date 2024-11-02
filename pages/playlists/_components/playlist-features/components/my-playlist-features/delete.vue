<script setup lang="ts">
	import { IconDelete } from '~/components/ui/icons';
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
	import PlaylistsService from '~/services/PlaylistsService';

	const { t } = useI18n();
	const localePath = useLocalePath();

	const playlist = inject<Ref<IPlaylistObject | null>>('playlist', ref(null));
	const createToast = inject<FCreateToast>('createToast', () => {});

	const deleteThisPlaylist = async () => {
		try {
			if (playlist.value == null) return;

			await PlaylistsService.deletePlaylist(playlist.value.id);

			createToast({
				id: playlist.value.id,
				type: 'success',
				message: t('toasts.playlists.delete.success'),
				lifespan: 3000,
			});

			navigateTo(localePath('/'));
		} catch (err) {
			console.error(err);
		}
	};
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="deleteThisPlaylist"
	>
		<ClientOnly>
			<IconDelete class="scale-125 text-zinc-600 dark:text-zinc-300" />
		</ClientOnly>

		<p class="text-nowrap dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.delete-playlist') }}
		</p>
	</div>
</template>
