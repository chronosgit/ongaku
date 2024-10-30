<script setup lang="ts">
	import Item from './Item.vue';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const mediaItems = inject('mediaItems') as IMediaItem[];
</script>

<template>
	<div class="flex flex-col items-center gap-1">
		<Item v-for="i in mediaItems" :key="i.id" :item="i" />
	</div>
</template>
