import type IExternalUrls from '~/interfaces/IExternalUrls';
import type IImage from '~/interfaces/IImage';

export default interface ICurrentUser {
	id: string;
	type: string;
	email: string;
	display_name?: string | null;
	country: string;
	images: IImage[];
	followers: {
		href?: string | null;
		total: number;
	};
	explicit_content: Object;
	external_urls: IExternalUrls;
	product: string;
	href: string;
	uri: string;
}
