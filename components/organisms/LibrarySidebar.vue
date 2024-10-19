<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';

	const { isLeftSideVisible } = useLayoutStore();
</script>

<template>
	<aside
		class="fixed bottom-0 left-0 top-0 bg-red-400"
		:class="{
			'translate-x-0': isLeftSideVisible,
			'-translate-x-full': !isLeftSideVisible,
		}"
	>
		Sidebar
	</aside>
</template>
