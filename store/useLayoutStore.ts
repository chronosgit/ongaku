export const useLayoutStore = defineStore('useLayoutStore', () => {
	const isLeftSideOpen = ref(false);
	const isRightSideOpen = ref(false);

	const isLeftSidebarExtended = ref(false);

	const openLeftSide = () => (isLeftSideOpen.value = true);
	const closeLeftSide = () => (isLeftSideOpen.value = false);
	const toggleLeftSide = () => (isLeftSideOpen.value = !isLeftSideOpen.value);

	const extendLeftSide = () => (isLeftSidebarExtended.value = true);
	const shrinkLeftSide = () => (isLeftSidebarExtended.value = false);

	const openRightSide = () => (isRightSideOpen.value = true);
	const closeRightSide = () => (isRightSideOpen.value = false);
	const toggleRightSide = () =>
		(isRightSideOpen.value = !isRightSideOpen.value);

	return {
		isLeftSideOpen,
		isRightSideOpen,
		isLeftSidebarExtended,
		openLeftSide,
		closeLeftSide,
		toggleLeftSide,
		openRightSide,
		closeRightSide,
		toggleRightSide,
		extendLeftSide,
		shrinkLeftSide,
	};
});
