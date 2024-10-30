import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from '~/interfaces/business/IImageObject';

export default interface ICurrentUser {
	id: string;
	type: string;
	email: string;
	display_name?: string | null;
	country: string;
	images: IImageObject[];
	followers: {
		href?: string | null;
		total: number;
	};
	explicit_content: Object;
	external_urls: IExternalUrlsObject;
	product: string;
	href: string;
	uri: string;
}
