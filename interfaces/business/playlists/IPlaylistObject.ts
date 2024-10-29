import type ISimplifiedPlaylistObject from '~/interfaces/business/playlists/ISimplifiedPlaylistObject';

export default interface IPlaylistObject extends ISimplifiedPlaylistObject {
	followers: {
		href?: string | null;
		total: number;
	};
}
