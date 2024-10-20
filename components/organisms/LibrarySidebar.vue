<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';

	const layoutStore = useLayoutStore();
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="h-full rounded-r-lg p-4 transition-transform dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-full': !layoutStore.isLeftSideVisible,
		}"
	>
		Sidebar
	</aside>
</template>
