<script setup lang="ts">
	import { IconDelete } from '~/components/ui/icons';
	import type IMediaItem from '../../interfaces/IMediaItem';
	import PlaylistsService from '~/services/PlaylistsService';

	const closeCtxMenu = inject<Function>('closeCtxMenu', () => {});
	const removePlaylistLocally = inject<Function>(
		'removePlaylistLocally',
		() => {}
	);

	const props = defineProps<{
		playlist: IMediaItem;
	}>();

	const deletePlaylist = async () => {
		try {
			await PlaylistsService.deletePlaylist(props.playlist.id);

			removePlaylistLocally();
			closeCtxMenu();
		} catch (err) {
			console.error(err);
		}
	};
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="deletePlaylist"
	>
		<ClientOnly>
			<IconDelete class="scale-125 text-zinc-600 dark:text-zinc-300" />
		</ClientOnly>

		<p class="dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.delete-playlist') }}
		</p>
	</div>
</template>
