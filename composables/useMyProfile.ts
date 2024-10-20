import { useCurrentUserStore } from '~/store/useCurrentUserStore';

export default function () {
	const localePath = useLocalePath();
	const curUserStore = useCurrentUserStore();

	const { data: profile, execute: fetchMyProfile } = useAsyncData(
		'useMyProfile',
		async () => {
			try {
				const fetchedProfile = await curUserStore.fetchProfile();

				profile.value = fetchedProfile!;

				return fetchedProfile;
			} catch (err) {
				console.error(err);

				return null;
			}
		}
	);

	return { profile };
}
