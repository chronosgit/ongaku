<script setup lang="ts">
	import Cover from './components/Cover.vue';

	const props = defineProps<{ track?: any }>();

	watchEffect(() => console.log(props.track));
</script>

<template>
	<section
		class="flex items-center justify-between gap-4 p-2 dark:bg-black dark:text-white"
	>
		<div class="basis-1/4 bg-red-400">
			<Cover />
		</div>

		<!-- TODO: remake -->
		<div class="h-4 basis-1/2 bg-yellow-400"></div>

		<!-- TODO: remake -->
		<div class="h-4 basis-1/4 bg-blue-400"></div>
	</section>
</template>
