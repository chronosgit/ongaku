<script setup lang="ts">
	import { Slider } from 'ant-design-vue';
	import PlayerService from '~/services/PlayerService';
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();

	const curItemDurationSec = computed(() => {
		return Math.floor(Number(playerStore.curItemDurationMs) / 1000);
	});

	// useInterval(() => console.log(playerStore.progressMs));

	watch(
		() => playerStore.progressMs,
		(ms) => {
			const dur = playerStore.curItemDurationMs;

			if (dur != null && ms >= dur) {
				return;
			}

			PlayerService.skipToNext();
		}
	);
</script>

<template>
	<div class="flex w-full items-center gap-2">
		<p>0</p>

		<Slider
			:value="playerStore.progressMs / 1000"
			:min="0"
			:max="curItemDurationSec"
			:step="1"
			:handle-style="{
				border: 'none',
			}"
			class="w-full dark:bg-zinc-700"
		/>

		<p>{{ formatSeconds(curItemDurationSec) }}</p>
	</div>
</template>
