import PlayerService from '~/services/PlayerService';

const usePlayerStore = defineStore('playerStore', () => {
	const isPlaying = ref(false);
	const volume = ref<number | null>(null);

	const setPlayingState = (state: boolean) => {
		if (typeof state !== 'boolean') return;

		isPlaying.value = state;
	};

	const skipToPrevTrack = async () => {
		await PlayerService.skipToPrevious();

		setPlayingState(true);
	};

	const resumePlaying = async () => {
		await PlayerService.startOrResumePlayback();

		setPlayingState(true);
	};

	const pausePlaying = async () => {
		await PlayerService.pausePlayback();

		setPlayingState(false);
	};

	const skipToNextTrack = async () => {
		await PlayerService.skipToNext();

		setPlayingState(true);
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
		setPlayingState,
		skipToPrevTrack,
		resumePlaying,
		pausePlaying,
		skipToNextTrack,
		changeVolume,
	};
});

export { usePlayerStore };
