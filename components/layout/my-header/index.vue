<script setup lang="ts">
	import LeftSide from './left-side/index.vue';
	import MiddleSide from './middle-side/index.vue';
	import RightSide from './right-side/index.vue';
</script>

<template>
	<header class="flex items-center justify-between px-2 py-3 dark:bg-black">
		<LeftSide />

		<MiddleSide />

		<RightSide />
	</header>
</template>
