<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';
	import Closed from './closed/index.vue';
	import Opened from './opened/index.vue';

	const layoutStore = useLayoutStore();

	const { items, isLoading, fetch } = useMyAlbumsAndPlaylists();

	onMounted(() => fetch());
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute m-2 w-full rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 py-4 shadow-lg transition-transform dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,

			'max-w-80': layoutStore.isLeftSideOpen,
			'max-w-20': !layoutStore.isLeftSideOpen,
		}"
	>
		<Opened v-if="layoutStore.isLeftSideOpen" :items="items" />

		<Closed
			v-if="!layoutStore.isLeftSideOpen"
			:items="items"
			:is-loading="isLoading"
		/>
	</aside>
</template>
