import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default function () {
	const createNewPlaylist = (
		name: string,
		descr?: string,
		isPublic: boolean = true,
		collaborative: boolean = false
	) => {
		const { user } = useCurrentUserStore();

		if (!user) {
			console.error('Curren user is not defined');
			return;
		}

		const { execute } = useAsyncData(
			'createNewPlaylist',
			async () => {
				try {
					const res = await $fetch(`/api/users/${user.id}/playlists`, {
						method: 'POST',
						body: {
							name,
							public: isPublic,
							collaborative,
							description: descr,
						},
					});

					console.log(res);

					return res;
				} catch (err) {
					console.error(err);

					return err;
				}
			},
			{
				immediate: false,
			}
		);

		execute();
	};

	return { createNewPlaylist };
}
