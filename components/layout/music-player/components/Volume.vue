<script setup lang="ts">
	import { Slider } from 'ant-design-vue';
	import { IconVolumeUp } from '~/components/ui/icons';
	import PlayerService from '~/services/PlayerService';
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();

	const volume = ref(playerStore.volume);

	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

	const changeVolume = (newVolume: number) => {
		volume.value = newVolume;

		if (debounceTimeout) {
			clearTimeout(debounceTimeout);
		}

		debounceTimeout = setTimeout(() => {
			PlayerService.setPlaybackVolume(newVolume);
		}, 300);
	};
</script>

<template>
	<div class="flex items-center justify-center gap-4">
		<label for="range">
			<p class="sr-only">Volume</p>

			<LazyClientOnly>
				<IconVolumeUp class="scale-125" />
			</LazyClientOnly>
		</label>

		<Slider
			:value="volume"
			:min="0"
			:max="100"
			:step="1"
			:handle-style="{
				border: 'none',
			}"
			class="w-1/2 dark:bg-zinc-700"
			@change="changeVolume"
		/>
	</div>
</template>
