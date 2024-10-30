import type ISimplifiedArtistObject from '~/interfaces/business/artists/ISimplifiedArtistObject';
import type IImageObject from '~/interfaces/business/IImageObject';

export default interface IArtistObject extends ISimplifiedArtistObject {
	followers: { href?: string | null; total: number };
	genres: string[];
	images: IImageObject[];
	popularity: number;
}
