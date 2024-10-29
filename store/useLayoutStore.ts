export const useLayoutStore = defineStore('layoutStore', () => {
	const isLeftSideVisible = ref(false);
	const isLeftSideOpen = ref(false);
	const isRightSideOpen = ref(false);

	const toggleLeftSideVisibility = () => {
		if (isLeftSideVisible.value) {
			isLeftSideOpen.value = false;
			isLeftSideVisible.value = false;
		} else {
			isLeftSideVisible.value = true;
		}
	};
	const openLeftSide = () => (isLeftSideOpen.value = true);
	const closeLeftSide = () => (isLeftSideOpen.value = false);

	const openRightSide = () => (isRightSideOpen.value = true);
	const closeRightSide = () => (isRightSideOpen.value = false);
	const toggleRightSide = () =>
		(isRightSideOpen.value = !isRightSideOpen.value);

	return {
		isLeftSideVisible,
		isLeftSideOpen,
		isRightSideOpen,
		toggleLeftSideVisibility,
		openLeftSide,
		closeLeftSide,
		openRightSide,
		closeRightSide,
		toggleRightSide,
	};
});
