import type IImageObject from '~/interfaces/business/IImageObject';

export default interface IMediaItem {
	id: string;
	name: string;
	descr?: string | null;
	image: IImageObject | null;
	owners: {
		id: string;
		name: string;
	}[];
	type: 'album' | 'playlist';
}
