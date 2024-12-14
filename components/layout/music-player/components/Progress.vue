<script setup lang="ts">
	import { Slider } from 'ant-design-vue';
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();

	const progressLabel = computed(() => {
		if (Number.isNaN(playerStore.progressMs) || !playerStore.progressMs)
			return '';

		const progressSec = Math.floor(playerStore.progressMs / 1000);

		return formatSeconds(progressSec);
	});

	const curItemDurationLabel = computed(() => {
		const sec = Math.floor(Number(playerStore.curItem?.duration_ms) / 1000);

		if (Number.isNaN(sec)) return '';

		return formatSeconds(sec);
	});
</script>

<template>
	<div class="flex w-full items-center gap-2">
		<p>{{ progressLabel }}</p>

		<Slider
			:value="playerStore.progressMs / 1000"
			:min="0"
			:max="Math.floor(Number(playerStore.curItem?.duration_ms) / 1000)"
			:step="1"
			:handle-style="{
				border: 'none',
			}"
			class="w-full dark:bg-zinc-700"
		/>

		<p>{{ curItemDurationLabel }}</p>
	</div>
</template>
