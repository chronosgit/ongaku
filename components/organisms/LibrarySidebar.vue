<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';

	const layoutStore = useLayoutStore();
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute bg-red-400 transition-transform"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-full': !layoutStore.isLeftSideVisible,
		}"
	>
		Sidebarfsafsasfsfafs
	</aside>
</template>
