<script setup lang="ts">
	import { Slider } from 'ant-design-vue';
	import { IconVolumeUp } from '~/components/ui/icons';
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();
</script>

<template>
	<div class="flex items-center gap-4">
		<label for="range">
			<p class="sr-only">Volume</p>

			<LazyClientOnly>
				<IconVolumeUp class="scale-125" />
			</LazyClientOnly>
		</label>

		<Slider
			v-model="playerStore.volume"
			:min="0"
			:max="100"
			:step="1"
			:handle-style="{
				border: 'none',
			}"
			class="w-12 dark:bg-zinc-700"
			@change="playerStore.changeVolume"
		/>
	</div>
</template>
