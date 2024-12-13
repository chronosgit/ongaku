<script setup lang="ts">
	import PlayerService from '~/services/PlayerService';
	import Controls from './components/Controls.vue';
	import Cover from './components/Cover.vue';
	import Volume from './components/Volume.vue';
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();

	onBeforeMount(async () => {
		const res = await PlayerService.getPlaybackState();

		if (res.data == null) return;

		const playbackVolume = res.data.device?.volume_percent;
		if (playbackVolume != null) playerStore.volume = playbackVolume;

		const isSomethingPlaying = res.data.is_playing;
		if (isSomethingPlaying !== null) playerStore.isPlaying = isSomethingPlaying;
	});
</script>

<template>
	<section
		class="flex items-center justify-between gap-4 p-2 dark:bg-black dark:text-white"
	>
		<Cover class="flex-basis-1/4 bg-red-400" />

		<Controls class="flex-basis-1/2" />

		<Volume class="flex-basis-1/4" />
	</section>
</template>
