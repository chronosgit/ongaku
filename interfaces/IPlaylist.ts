import type IPlaylistTrack from '~/interfaces/IPlaylistTrack';
import type ISimplifiedPlaylist from '~/interfaces/ISimplifiedPlaylist';

export default interface IPlaylist extends ISimplifiedPlaylist {
	followers: {
		href: string;
		total: number;
	};
	tracks: {
		href: string;
		limit: number;
		next: string;
		offset?: number | null;
		previous?: string | null;
		total: number;
		items: IPlaylistTrack[];
	};
}
