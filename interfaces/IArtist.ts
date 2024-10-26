import type IExternalUrls from '~/interfaces/IExternalUrls';
import type IImage from '~/interfaces/IImage';

export default interface IArtist {
	external_urls: IExternalUrls;
	followers: { href?: string | null; total: number };
	genres: string[];
	href: string;
	id: string;
	images: IImage[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
}
