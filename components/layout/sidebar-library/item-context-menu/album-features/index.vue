<script setup lang="ts">
	import { IconCheck } from '~/components/ui/icons';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const localRemoveItemById = inject('localRemoveItemById') as Function;
	const refetchMediaItems = inject('refetchMediaItems') as Function;

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
	}>();

	const { removeAlbumFromLibrary } = useMyAlbums();

	const onRemoveAlbumClick = () => {
		removeAlbumFromLibrary(props.playlist.id).then(() => {
			localRemoveItemById(props.playlist.id);

			refetchMediaItems();
		});
	};
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="onRemoveAlbumClick()"
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
