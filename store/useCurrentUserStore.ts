import type ICurrentUser from '~/interfaces/ICurrentUser';

export const useCurrentUserStore = defineStore(
	'currentUserStore',
	() => {
		const user = ref<ICurrentUser>();
		const isAuthenticated = ref(false);

		const authenticateState = () => (isAuthenticated.value = true);

		const disauthenticateState = () => (isAuthenticated.value = false);

		const updateUser = (loggedInUser: ICurrentUser) => {
			console.log(loggedInUser);
		};

		return {
			user,
			isAuthenticated,
			authenticateState,
			disauthenticateState,
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
