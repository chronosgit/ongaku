<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';

	const layoutStore = useLayoutStore();
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute rounded-lg bg-gray-300 p-4 transition-transform dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,
		}"
	>
		Sidebar
	</aside>
</template>
