import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from '~/interfaces/business/IImageObject';
import type ICopyrightObject from '../ICopyrightObject';

export default interface IEpisodeObject {
	audio_preview_url?: string | null;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: IExternalUrlsObject;
	href: string;
	id: string;
	images: IImageObject[];
	is_externally_hosted: boolean;
	is_playable: boolean;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: {
		fully_played: boolean;
		resume_position_ms: number;
	};
	type: 'episode';
	uri: string;
	restrictions: { reason: 'market' | 'product' | 'explicit' };
	show: {
		available_markets: string[];
		copyrights: ICopyrightObject[];
		description: string;
		html_description: string;
		explicit: boolean;
		external_urls: IExternalUrlsObject;
		href: string;
		id: string;
		images: IImageObject[];
		is_externally_hosted: boolean;
		languages: string[];
		media_type: string;
		name: string;
		publisher: string;
		type: string;
		uri: string;
		total_episode: number;
	};
}
