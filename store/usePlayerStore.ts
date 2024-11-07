import type { FStartOrResumePlayback } from '~/interfaces/business/player/FGiveTrackToPlayer';

export const usePlayerStore = defineStore('playerStore', () => {
	const startOrResumePlayback: FStartOrResumePlayback = (
		context_uri,
		uris,
		offset,
		position_ms
	) => {
		console.log(context_uri, uris, offset, position_ms);
	};

	return { startOrResumePlayback };
});
