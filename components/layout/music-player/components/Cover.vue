<script setup lang="ts">
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();
</script>

<template>
	<p v-if="playerStore.curItemName == null">No current item</p>

	<p v-else>{{ playerStore.curItemName }}</p>
</template>
