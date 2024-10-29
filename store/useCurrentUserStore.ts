import type ICurrentUser from '~/interfaces/business/users/ICurrentUser';

export const useCurrentUserStore = defineStore(
	'currentUserStore',
	() => {
		const user = ref<ICurrentUser | null>(null);
		const isAuthenticated = ref(false);

		const disauthenticate = () => {
			isAuthenticated.value = false;
			user.value = null;
		};

		const fetchProfile = async () => {
			try {
				const res = await $fetch('/api/me');

				if (!res) {
					console.warn('No response received from /api/me');

					disauthenticate();

					return;
				}

				isAuthenticated.value = true;

				const fetchedUser = res.data as ICurrentUser;
				user.value = fetchedUser;

				return fetchedUser;
			} catch (err) {
				disauthenticate();

				throw err;
			}
		};

		const updateUser = (loggedInUser: ICurrentUser) => {
			console.log(loggedInUser);
		};

		return {
			user,
			isAuthenticated,
			fetchProfile,
			disauthenticate,
			updateUser,
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.cookies(),
			pick: ['isAuthenticated'],
		},
	}
);
