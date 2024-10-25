<script setup lang="ts">
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';
	import Item from './Item.vue';

	const props = defineProps<{ items: IMediaAlbumOrPlaylist[] }>();
</script>

<template>
	<div class="flex flex-col items-center gap-1">
		<Item v-for="i in props.items" :key="i.id" :item="i" />
	</div>
</template>
