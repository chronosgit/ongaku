import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';
import type IPlaylistTrackObject from './IPlaylistTrackObject';

export default interface IPlaylistObject extends ISimplifiedPlaylistObject {
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
		items: IPlaylistTrackObject[];
	};
}
