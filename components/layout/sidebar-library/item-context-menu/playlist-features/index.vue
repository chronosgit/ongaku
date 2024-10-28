<script setup lang="ts">
	import Delete from './delete.vue';
	import Edit from './edit.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
	}>();
</script>

<template>
	<Edit :playlist="props.playlist" />

	<Delete :playlist="props.playlist" />
</template>
