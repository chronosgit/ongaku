import type IImage from '~/interfaces/IImage';
import type ISimplifiedArtist from '~/interfaces/ISimplifiedArtist';
import type IExternalUrls from '~/interfaces/IExternalUrls';
import type ISimplifiedTrack from './ISimplifiedTrack';
import type ICopyright from './ICopyright';

export default interface IMyAlbum {
	id: string;
	name: string;
	type: 'album';
	album_type: 'album' | 'single' | 'compilation';
	href: string;
	total_tracks: number;
	release_date: string;
	release_date_precision: string;
	uri: string;
	artists: ISimplifiedArtist[];
	images: IImage[];
	available_markets: string[];
	external_urls: IExternalUrls;
	restrictions?: Object;
	tracks: {
		href: string;
		limit: number;
		next?: string | null;
		offset: number;
		previous?: string | null;
		total: number;
		items: ISimplifiedTrack[];
	};
	copyrights: ICopyright[];
	external_ids: Object;
	genres: string[];
	label: string;
	popularity: number;
}
