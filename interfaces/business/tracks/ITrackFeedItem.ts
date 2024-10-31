import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from '~/interfaces/business/IImageObject';

export default interface ITrackFeedItem {
	id: string;
	name: string;
	album: {
		id: string;
		uri: string;
		name: string;
		external_urls: IExternalUrlsObject;
	};
	artists: {
		id: string;
		name: string;
		uri: string;
		external_urls: IExternalUrlsObject;
	}[];
	images: IImageObject[] | null[] | null;
	track_number: number; // track or disc
	added_at: string; // date-time
	duration_ms: number;
	uri: string;
	type: 'track';
	context: {
		// ?
		uri: string;
		type: 'album' | 'artist' | 'playlist';
		offset?: {
			position?: number;
			uri?: string;
		};
	};
}
