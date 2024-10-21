<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';
	import type IPlaylist from '~/interfaces/IPlaylist';

	const props = defineProps<{
		playlists: IPlaylist[] | null;
	}>();
	const layoutStore = useLayoutStore();
</script>

<template>
	<div class="">Opened sidebar</div>
</template>
