<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';

	const layoutStore = useLayoutStore();
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute m-2 rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 p-4 transition-transform dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,
		}"
	>
		Sidebar
	</aside>
</template>
