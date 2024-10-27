import type IImage from '~/interfaces/IImage';
import type IPlaylistTrack from '~/interfaces/IPlaylistTrack';

export default interface IPlaylist {
	id: string;
	name: string;
	description?: string | null;
	href: string;
	uri: string;
	images: IImage[];
	owner: {
		id: string;
		type: string;
		display_name: string;
		uri: string;
		href: string;
	};
	followers: {
		href?: string | null;
		total: number;
	};
	tracks: {
		href: string;
		limit: number;
		next?: string | null;
		offset: number;
		previous?: string | null;
		total: number;
		items: IPlaylistTrack[];
	};
	type: string;
}
