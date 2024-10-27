<script setup lang="ts">
	import type IImage from '~/interfaces/IImage';

	const props = defineProps<{
		avatars: IImage[];
	}>();

	const avatar = computed(() => {
		if (!props.avatars.length) return '';

		return props.avatars[0].url;
	});
</script>

<template>
	<NuxtImg
		v-if="avatar"
		:src="avatar"
		alt="avatar"
		class="xs:h-44 xs:w-44 h-72 w-72 shrink-0 rounded-md sm:h-56 sm:w-56"
	/>

	<div v-else class="">{{ avatar }}</div>
</template>
