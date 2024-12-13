import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IEpisodeObject from '~/interfaces/business/episodes/IEpisodeObject';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';
import type IDevice from '~/interfaces/business/player/IDevice';

export default interface IPlaybackState {
	device: IDevice;
	repeat_state: string;
	shuffle_state: boolean;
	context?: {
		type: string;
		href: string;
		external_urls: IExternalUrlsObject;
		uri: string;
	} | null;
	timestamp: number;
	progress_ms: number;
	is_playing: boolean;
	item: ITrackObject | IEpisodeObject;
	currently_playing_type: string;
	actions: {
		interrupting_playback?: boolean;
		pausing?: boolean;
		resuming?: boolean;
		seeking?: boolean;
		skipping_next?: boolean;
		skipping_prev?: boolean;
		toggling_repeat_context?: boolean;
		toggling_shuffle?: boolean;
		toggling_repeat_track?: boolean;
		transferring_playback?: string;
	};
}
