import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type IImageObject from '~/interfaces/business/IImageObject';

export default interface ISimplifiedPlaylistObject {
	collaborative: boolean;
	description?: string | null;
	external_urls: IExternalUrlsObject;
	href: string;
	id: string;
	images?: IImageObject[] | null;
	name: string;
	owner: {
		external_urls: IExternalUrlsObject;
		followers: { href?: string | null; total: number };
		href: string;
		id: string;
		type: string | 'user';
		uri: string;
		display_name?: string | null;
	};
	public: boolean;
	snapshot_id: string;
	tracks: { href: string; total: number };
	type: 'playlist';
	uri: string;
}
