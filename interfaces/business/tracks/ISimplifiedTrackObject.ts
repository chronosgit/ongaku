import type ISimplifiedArtistObject from '~/interfaces/business/artists/ISimplifiedArtistObject';
import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';

export default interface ISimplifiedTrackObject {
	artists: ISimplifiedArtistObject[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: IExternalUrlsObject;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: {
		external_urls: IExternalUrlsObject;
		href: string;
		id: string;
		type: 'track';
		uri: string;
	};
	restrictions: { reason: string | 'market' | 'product' | 'explicit' };
	name: string;
	preview_url?: string | null;
	track_number: number;
	type: 'track';
	uri: string;
	is_local: boolean;
}
