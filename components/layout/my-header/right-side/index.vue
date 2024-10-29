<script setup lang="ts">
	const DesktopVersion = defineAsyncComponent(
		() => import('./desktop/index.vue')
	);
	const MobileVersion = defineAsyncComponent(
		() => import('./mobile/index.vue')
	);
</script>

<template>
	<section>
		<DesktopVersion class="hidden md:flex" />

		<MobileVersion class="md:hidden" />
	</section>
</template>
