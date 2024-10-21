<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';
	import Closed from './Closed.vue';
	import Open from './Open.vue';

	const layoutStore = useLayoutStore();
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute m-2 w-full rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 p-4 shadow-lg transition-transform dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,

			'max-w-80': layoutStore.isLeftSideOpen,
			'max-w-20': !layoutStore.isLeftSideOpen,
		}"
	>
		<Open v-if="layoutStore.isLeftSideOpen" :playlists="[]" />

		<Closed v-if="!layoutStore.isLeftSideOpen" :playlists="[]" />
	</aside>
</template>
