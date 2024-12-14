<script setup lang="ts">
	import Controls from './components/Controls.vue';
	import Cover from './components/Cover.vue';
	import Volume from './components/Volume.vue';
	import Progress from './components/Progress.vue';
	import { usePlayerStore } from '~/store/usePlayerStore';
	import PlayerService from '~/services/PlayerService';
	import PlaylistsService from '~/services/PlaylistsService';
	import TracksService from '~/services/TracksService';

	const playerStore = usePlayerStore();

	const flag = ref(false);

	const syncVolumeAndState = async () => {
		const res = await PlayerService.getPlaybackState();
		if (res == null || res.data == null) return;

		const playbackVolume = res.data.device?.volume_percent;
		if (playbackVolume != null) playerStore.volume = playbackVolume;

		const isSomethingPlaying = res.data.is_playing;
		if (isSomethingPlaying !== null) playerStore.isPlaying = isSomethingPlaying;
	};

	const syncItemInfo = async () => {
		const res = await PlayerService.getCurrentlyPlayingTrack();
		if (res == null || res.data == null) return;

		const progressMs = res.data.progress_ms;

		if (playerStore.curItem?.name != res.data.item.name) flag.value = false;

		playerStore.progressMs = progressMs;

		return res.data;
	};

	const transferPlayback = () => {
		const { $spotifyPlayer } = useNuxtApp();

		$spotifyPlayer.then((deviceId: string) =>
			PlayerService.transferPlayback([deviceId])
		);
	};

	onBeforeMount(() => transferPlayback());

	useInterval(() => {
		syncVolumeAndState();

		syncItemInfo().then(async (data) => {
			if (flag.value) return;

			// @ts-ignore
			const itemId = data?.item?.id;
			if (itemId == null) return;

			const res = await TracksService.getTrack(itemId);
			if (res == null || res.data == null) return;

			playerStore.curItem = res.data;

			flag.value = true;
		});
	}, 1000);
</script>

<template>
	<section
		class="flex items-center justify-between gap-4 p-2 dark:bg-black dark:text-white"
	>
		<Cover class="w-[30%]" />

		<div class="flex w-full flex-col items-center gap-2">
			<Controls class="flex-basis-1/2" />

			<Progress />
		</div>

		<Volume class="w-[30%]" />
	</section>
</template>
