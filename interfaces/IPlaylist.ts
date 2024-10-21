import type IPlaylistOwner from '~/interfaces/IPlaylistOwner';
import type IImage from '~/interfaces/IImage';

export default interface IPlaylist {
	id: string;
	name: string;
	description: string;
	owner: IPlaylistOwner;
	tracks: {
		href: string;
		total: number;
	};
	images: IImage[];
	type: string;
	uri: string;
	href: string;
	external_urls: Object;
	primary_color: null;
	snapshot_id: string;
	collaborative: boolean;
	public: boolean;
}
