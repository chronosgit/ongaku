import PlayerService from '~/services/PlayerService';

const usePlayerStore = defineStore('playerStore', () => {
	const isPlaying = ref(false);
	const volume = ref(0);
	const progressMs = ref(0);

	const curItemName = ref<string | null>(null);
	const curItemDurationMs = ref<number | null>(null);

	const skipToPrevTrack = async () => {
		await PlayerService.skipToPrevious();

		isPlaying.value = true;
	};

	const resumePlaying = async () => {
		await PlayerService.startOrResumePlayback();

		isPlaying.value = true;
	};

	const pausePlaying = async () => {
		await PlayerService.pausePlayback();

		isPlaying.value = false;
	};

	const skipToNextTrack = async () => {
		await PlayerService.skipToNext();

		isPlaying.value = true;
	};

	const changeVolume = async (newVolume: number) => {
		if (typeof newVolume !== 'number' || newVolume < 0 || newVolume > 100)
			return;

		await PlayerService.setPlaybackVolume(newVolume);

		volume.value = newVolume;
	};

	return {
		isPlaying,
		volume,
		progressMs,
		curItemName,
		curItemDurationMs,
		skipToPrevTrack,
		resumePlaying,
		pausePlaying,
		skipToNextTrack,
		changeVolume,
	};
});

export { usePlayerStore };
