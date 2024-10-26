import type IExternalUrls from './IExternalUrls';

export default interface IPlaylistTrack {
	added_at: string;
	added_by: {
		external_urls: IExternalUrls;
		followers: {
			href?: string | null;
			total: number;
		};
		href: string;
		id: string;
		type: 'user';
		uri: string;
	};
	is_local: boolean;
	track: Object;
}
