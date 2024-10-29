import type IExternalUrlsObject from '~/interfaces/business/IExternalUrlsObject';
import type ITrackObject from '~/interfaces/business/tracks/ITrackObject';
import type IEpisodeObject from '~/interfaces/business/episodes/IEpisodeObject';

export default interface IPlaylistTrackObject {
	added_at: string;
	added_by: {
		external_urls: IExternalUrlsObject;
		followers: { href?: string | null; total: number };
		href: string;
		id: string;
		type: string | 'user';
		uri: string;
	};
	is_local: boolean;
	track: ITrackObject | IEpisodeObject;
}
