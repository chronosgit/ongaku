import type IImage from '~/interfaces/IImage';

export default interface IMediaAlbumOrPlaylist {
	id: string;
	type: 'album' | 'playlist'; // album or playlist
	name: string;
	description?: string;
	owner: string;
	image: IImage;
}
