import type ISimplifiedArtistObject from '~/interfaces/business/artists/ISimplifiedArtistObject';
import type ISimplifiedTrackObject from '~/interfaces/business/tracks/ISimplifiedTrackObject';
import type ICopyrightObject from '~/interfaces/business/ICopyrightObject';
import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from '~/interfaces/business/IImageObject';

export default interface ISavedAlbumObject {
	added_at: string; // date-time string
	album: {
		album_type: string;
		total_tracks: number;
		available_markets: string[];
		external_urls: IExternalUrlsObject;
		href: string;
		id: string;
		images: IImageObject[];
		nmae: string;
		release_date: string;
		release_date_precision: string;
		restrictions?: { reason: string };
		type: string | 'album';
		uri: string;
		artists: ISimplifiedArtistObject[];
		tracks: {
			href: string;
			limit: number;
			next?: string | null;
			offset: number;
			previous?: string | null;
			total: number;
			items: ISimplifiedTrackObject[];
		};
		copyrights: ICopyrightObject[];
		external_ids: { isrc: string; ean: string; upc: string };
		genres: string[];
		label: string;
		popularity: number;
	};
}
