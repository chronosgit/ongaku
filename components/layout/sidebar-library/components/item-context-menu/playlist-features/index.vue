<script setup lang="ts">
	import Delete from './delete.vue';
	import Edit from './edit.vue';
	import type IMediaItem from '../../interfaces/IMediaItem';

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
