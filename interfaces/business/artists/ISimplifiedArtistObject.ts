import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';

export default interface ISimplifiedArtistObject {
	external_urls: IExternalUrlsObject;
	href: string;
	id: string;
	name: string;
	type: 'artist';
	uri: string;
}
