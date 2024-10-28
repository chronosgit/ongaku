<script setup lang="ts">
	import { IconDelete } from '~/components/ui/icons';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const localRemoveItemById = inject('localRemoveItemById') as Function;
	const closeContextMenu = inject('closeContextMenu') as Function;

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
	}>();

	const { deleteMyPlaylist } = useMyPlaylists();

	const onDeletePlaylistClick = () => {
		deleteMyPlaylist(props.playlist.id).then(() => {
			closeContextMenu();

			localRemoveItemById(props.playlist.id);
		});
	};
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="onDeletePlaylistClick()"
	>
		<ClientOnly>
			<IconDelete class="scale-125 text-zinc-600 dark:text-zinc-300" />
		</ClientOnly>

		<p class="dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.delete-playlist') }}
		</p>
	</div>
</template>
