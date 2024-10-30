import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from './IImageObject';
import type ISimplifiedArtistObject from './artists/ISimplifiedArtistObject';

export default interface IPlayHistoryObject {
	track: {
		album: {
			album_type: string;
			total_tracks: number;
			available_markets: string[];
			external_urls: IExternalUrlsObject;
			href: string;
			id: string;
			images: IImageObject[];
			name: string;
			release_date: string;
			release_date_precision: string;
			restrictions: { reason: 'market' | 'product' | 'explicit' };
			type: string;
			uri: string;
			artists: ISimplifiedArtistObject[];
		};
		artists: ISimplifiedArtistObject[];
		available_markets: string[];
		disc_number: number;
		duration_ms: number;
		explicit: boolean;
		external_ids: { isrc: string; ean: string; upc: string };
		external_urls: IExternalUrlsObject;
		href: string;
		id: string;
		is_playable: boolean;
		linked_from: Object;
		restrictions: { reason: 'market' | 'product' | 'explicit' };
		name: string;
		popularity: number;
		preview_url?: string | null;
		track_number: number;
		type: 'track';
		uri: string;
		is_local: boolean;
	};
	played_at: string; // date-time
	context: {
		type: string;
		href: string;
		external_urls: IExternalUrlsObject;
		uri: string;
	};
}
