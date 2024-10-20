import type ICurrentUser from '~/interfaces/ICurrentUser';

export const useCurrentUserStore = defineStore(
	'currentUserStore',
	() => {
		const user = ref<ICurrentUser | null>(null);
		const isAuthenticated = ref(false);

		const disauthenticate = () => {
			isAuthenticated.value = false;
			user.value = null;
		};

		const authenticate = async () => {
			try {
				const res = await $fetch('/api/me');

				if (!res) {
					console.warn('No response received from /api/me');

					disauthenticate();

					return;
				}

				const fetchedUser = res.data as ICurrentUser;

				user.value = fetchedUser;
				isAuthenticated.value = true;
			} catch (err) {
				console.error(err);

				disauthenticate();
			}
		};

		const updateUser = (loggedInUser: ICurrentUser) => {
			console.log(loggedInUser);
		};

		return {
			user,
			isAuthenticated,
			authenticate,
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
