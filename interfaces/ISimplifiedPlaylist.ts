import type IImage from '~/interfaces/IImage';
import type IExternalUrls from '~/interfaces/IExternalUrls';

export default interface ISimplifiedPlaylist {
	collaborative: boolean;
	description: string;
	external_urls: IExternalUrls;
	href: string;
	id: string;
	images: IImage[];
	name: string;
	owner: {
		external_urls: IExternalUrls;
		followers: {
			href: string;
			total: number;
		};
		href: string;
		id: string;
		type: 'user';
		uri: string;
		display_name: string;
	};
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		total: number;
	};
	type: string;
	uri: string;
}
