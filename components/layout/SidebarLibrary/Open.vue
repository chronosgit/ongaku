<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';

	const props = defineProps<{
		playlists: any[];
	}>();
	const layoutStore = useLayoutStore();
</script>

<template>
	<div class="">Opened sidebar</div>
</template>
