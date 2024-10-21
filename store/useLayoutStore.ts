export const useLayoutStore = defineStore('useLayoutStore', () => {
	const isLeftSideVisible = ref(false);
	const isLeftSideOpen = ref(false);
	const isRightSideOpen = ref(false);

	const isLeftSidebarExtended = ref(false);

	const toggleLeftSideVisibility = () => {
		if (isLeftSideVisible.value) {
			isLeftSidebarExtended.value = false;
			isLeftSideOpen.value = false;
			isLeftSideVisible.value = false;
		} else {
			isLeftSideVisible.value = true;
		}
	};
	const openLeftSide = () => (isLeftSideOpen.value = true);
	const closeLeftSide = () => (isLeftSideOpen.value = false);

	const extendLeftSide = () => (isLeftSidebarExtended.value = true);
	const shrinkLeftSide = () => (isLeftSidebarExtended.value = false);

	const openRightSide = () => (isRightSideOpen.value = true);
	const closeRightSide = () => (isRightSideOpen.value = false);
	const toggleRightSide = () =>
		(isRightSideOpen.value = !isRightSideOpen.value);

	return {
		isLeftSideVisible,
		isLeftSideOpen,
		isRightSideOpen,
		isLeftSidebarExtended,
		toggleLeftSideVisibility,
		openLeftSide,
		closeLeftSide,
		openRightSide,
		closeRightSide,
		toggleRightSide,
		extendLeftSide,
		shrinkLeftSide,
	};
});
