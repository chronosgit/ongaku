<script setup lang="ts">
	import PlaylistOnlyFeatures from './playlist-features/index.vue';
	import AlbumOnlyFeatures from './album-features/index.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
		isVisible: boolean;
	}>();
	const emit = defineEmits<{
		(e: 'closeContextMenu'): void;
	}>();

	provide('closeContextMenu', emit('closeContextMenu'));
</script>

<template>
	<div
		class="absolute z-10 flex min-w-14 flex-col gap-0.5 rounded-sm bg-zinc-200 p-1 shadow-lg dark:bg-zinc-800"
		:class="{ block: props.isVisible, hidden: !props.isVisible }"
	>
		<PlaylistOnlyFeatures
			v-if="props.playlist.type === 'playlist'"
			:playlist="props.playlist"
		/>

		<AlbumOnlyFeatures v-else :playlist="props.playlist" />
	</div>
</template>
