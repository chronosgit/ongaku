<script setup lang="ts">
	import DesktopVersion from './desktop/index.vue';
	import MobileVersion from './mobile/index.vue';
</script>

<template>
	<section>
		<DesktopVersion class="hidden md:flex" />

		<MobileVersion class="md:hidden" />
	</section>
</template>
