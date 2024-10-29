import type IImageObject from '~/interfaces/IImageObject';

export default interface ISimplifiedInterfaceObject {
	collaborative: boolean;
	description: string;
	external_urls: { spotify: string };
	href: string;
	id: string;
	images: IImageObject[];
	name: string;
	owner: {
		external_urls: { spotify: string };
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
