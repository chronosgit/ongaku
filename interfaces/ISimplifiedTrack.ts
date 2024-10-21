import type ISimplifiedArtist from '~/interfaces/ISimplifiedArtist';
import type IExternalUrls from './IExternalUrls';

export default interface ISimplifiedTrack {
	artists: ISimplifiedArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: IExternalUrls;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: Object;
	restrictions: Object;
	name: string;
	preview_url: string | null | undefined;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}
