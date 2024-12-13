import type IServerApiSuccessResponse from '~/interfaces/IServerApiSuccessResponse';
import type { FStartOrResumePlayback } from '~/interfaces/business/player/FGiveTrackToPlayer';
import type IPlaybackState from '~/interfaces/business/player/IPlaybackState';

class PlayerService {
	static getPlaybackState() {
		return $fetch<IServerApiSuccessResponse<IPlaybackState | undefined>>(
			'/api/me/player',
			{ method: 'GET' }
		);
	}

	static transferPlayback(deviceIds: string[]) {
		return $fetch('/api/me/player', { method: 'PUT', body: { deviceIds } });
	}

	static getAvailableDevices() {
		return $fetch('/api/me/player/devices', { method: 'GET' });
	}

	static getCurrentlyPlayingTrack() {
		return $fetch<IServerApiSuccessResponse<IPlaybackState | undefined>>(
			'/api/me/player/currently-playing',
			{ method: 'GET' }
		);
	}

	static startOrResumePlayback: FStartOrResumePlayback = async (
		contextUri,
		uris,
		offset,
		positionMs
	) => {
		const requestBody: Record<string, any> = {};

		if (contextUri) requestBody.contextUri = contextUri;
		if (uris) requestBody.uris = uris;
		if (offset) requestBody.offset = offset;
		if (typeof positionMs === 'number') requestBody.position_ms = positionMs;

		return $fetch(`/api/me/player/play`, {
			method: 'PUT',
			body: requestBody,
		});
	};

	static pausePlayback(deviceId?: string) {
		return $fetch('/api/me/player/pause', {
			method: 'PUT',
			body: { deviceId },
		});
	}

	static skipToNext(deviceId?: string) {
		return $fetch('/api/me/player/next', {
			method: 'POST',
			body: { deviceId },
		});
	}

	static skipToPrevious(deviceId?: string) {
		return $fetch('/api/me/player/prev', {
			method: 'POST',
			body: { deviceId },
		});
	}

	static setPlaybackVolume(volumePercent: number, deviceId?: string) {
		return $fetch('/api/me/player/volume', {
			method: 'PUT',
			body: { volumePercent, deviceId },
		});
	}
}

export default PlayerService;
