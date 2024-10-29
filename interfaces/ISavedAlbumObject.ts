import type IImageObject from '~/interfaces/IImageObject';
import type ICopyrightObject from '~/interfaces/ICopyrightObject';

export default interface ISavedAlbumsObject {
	added_at: string; // date-time string
	album: {
		album_type: string;
		total_tracks: number;
		available_markets: string[];
		external_urls: { spotify: string };
		href: string;
		id: string;
		images: IImageObject[];
		nmae: string;
		release_date: string;
		release_date_precision: string;
		restrictions?: { reason: string };
		type: string | 'album';
		uri: string;
		artists: {}; // TODO: finish
		tracks: {
			href: string;
			limit: number;
			next?: string | null;
			offset: number;
			previous?: string | null;
			total: number;
			items: {}; // TODO: finish
		};
		copyrights: ICopyrightObject[];
		external_ids: { isrc: string; ean: string; upc: string };
		genres: string[];
		label: string;
		popularity: number;
	};
}
