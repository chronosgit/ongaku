<script setup lang="ts">
	import { IconEdit } from '~/components/ui/icons';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const closeContextMenu = inject('closeContextMenu') as Function;
	const editPlaylist = inject('editPlaylist') as Function;

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
	}>();

	const onEditPlaylist = () => {
		editPlaylist(props.playlist);
		closeContextMenu();
	};
</script>

<template>
	<div
		class="flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="onEditPlaylist()"
	>
		<ClientOnly>
			<IconEdit class="scale-125 text-zinc-600 dark:text-zinc-300" />
		</ClientOnly>

		<p class="dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.edit-playlist') }}
		</p>
	</div>
</template>
