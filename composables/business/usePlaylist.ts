import type IImage from '~/interfaces/IImage';
import type IPlaylistTrack from '~/interfaces/IPlaylistTrack';

interface IPlaylist {
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

export default function (playlistId: string) {
	const {
		data: playlist,
		status,
		execute: fetchPlaylist,
	} = useLazyAsyncData<IPlaylist | null>(
		'usePlaylist',
		async () => {
			try {
				const res = await $fetch<IPlaylist>(`/api/playlists/${playlistId}`, {
					params: {
						fields: 'description,href,id,images,name,owner,tracks,type,uri',
					},
				});

				console.log(res);

				return res;
			} catch (err) {
				console.error(err);

				return null;
			}
		},
		{ immediate: false }
	);

	const isLoading = computed(() => status.value === 'pending');

	return { playlist, isLoading, fetchPlaylist };
}
