import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from '~/interfaces/business/IImageObject';

export default interface IUserProfile {
	display_name?: string | null;
	external_urls: IExternalUrlsObject;
	followers: { href?: string | null; total: number };
	href: string;
	id: string;
	images: IImageObject[];
	type: string;
	uri: string;
}
