<script setup lang="ts">
	import Controls from './components/Controls.vue';
	import Cover from './components/Cover.vue';
	import Volume from './components/Volume.vue';
	import Progress from './components/Progress.vue';
	import { usePlayerStore } from '~/store/usePlayerStore';
	import PlayerService from '~/services/PlayerService';

	const playerStore = usePlayerStore();

	const syncVolumeAndState = async () => {
		const res = await PlayerService.getPlaybackState();
		if (res == null || res.data == null) return;

		const playbackVolume = res.data.device?.volume_percent;
		if (playbackVolume != null) playerStore.volume = playbackVolume;

		const isSomethingPlaying = res.data.is_playing;
		if (isSomethingPlaying !== null) playerStore.isPlaying = isSomethingPlaying;
	};

	const syncTrackInfo = async () => {
		const res = await PlayerService.getCurrentlyPlayingTrack();
		if (res == null || res.data == null) return;

		const name = res.data.item.name;
		const durationMs = res.data.item.duration_ms;
		const progressMs = res.data.progress_ms;

		playerStore.curItemName = name;
		playerStore.curItemDurationMs = durationMs;
		playerStore.progressMs = progressMs;
	};

	const transferPlayback = () => {
		const { $spotifyPlayer } = useNuxtApp();

		$spotifyPlayer.then((deviceId: string) =>
			PlayerService.transferPlayback([deviceId])
		);
	};

	onBeforeMount(async () => {
		syncVolumeAndState();

		syncTrackInfo();

		transferPlayback();
	});
</script>

<template>
	<section
		class="flex items-center justify-between gap-10 p-2 dark:bg-black dark:text-white"
	>
		<Cover class="flex-basis-1/4" />

		<div class="flex w-full flex-col items-center gap-2">
			<Controls class="flex-basis-1/2" />

			<Progress />
		</div>

		<Volume class="flex-basis-1/4" />
	</section>
</template>
