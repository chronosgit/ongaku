import type IExternalUrls from '~/interfaces/IExternalUrls';

export default interface ISimplifiedArtist {
	id: string;
	name: string;
	type: 'artist';
	uri: string;
	href: string;
	external_urls: IExternalUrls;
}
