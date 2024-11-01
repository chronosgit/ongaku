<script setup lang="ts">
	import type IMediaItem from '../../../interfaces/IMediaItem';
	import Delete from './delete.vue';
	import Edit from './edit.vue';

	const closeCtxMenu = inject<Function>('closeCtxMenu', () => {});
	const playlist = inject<IMediaItem>('item');

	if (playlist == null) {
		throw createError('Invalid playlist in ItemContextMenu');
	}

	provide('closeCtxMenu', closeCtxMenu);
</script>

<template>
	<Edit :playlist="playlist" />

	<Delete :playlist="playlist" />
</template>
