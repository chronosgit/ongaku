<script setup lang="ts">
	import AlbumOnlyFeatures from './album-features/index.vue';
	import PlaylistOnlyFeatures from './playlist-features/index.vue';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const props = defineProps<{
		item: IMediaItem;
		isVisible: boolean;
	}>();
	const emit = defineEmits<{
		(e: 'closeContextMenu'): void;
		(e: 'removePlaylistLocally', playlistId: string): void;
		(
			e: 'editPlaylistLocally',
			playlistId: string,
			newName: string,
			newDescr: string
		): void;
	}>();

	provide('item', props.item);
	provide('closeCtxMenu', () => emit('closeContextMenu'));
	provide('removePlaylistLocally', () =>
		emit('removePlaylistLocally', props.item.id)
	);
	provide(
		'editPlaylistLocally',
		(playlistId: string, newName: string, newDescr: string) =>
			emit('editPlaylistLocally', playlistId, newName, newDescr)
	);
</script>

<template>
	<div
		class="absolute z-10 flex min-w-14 flex-col gap-0.5 rounded-sm bg-zinc-200 p-1 shadow-lg dark:bg-zinc-800"
		:class="{ block: props.isVisible, hidden: !props.isVisible }"
	>
		<PlaylistOnlyFeatures v-if="props.item.type === 'playlist'" />

		<AlbumOnlyFeatures v-else />
	</div>
</template>
