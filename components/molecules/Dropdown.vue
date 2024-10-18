<script setup lang="ts">
	const props = defineProps<{ isOpen: boolean }>();
</script>

<template>
	<div class="absolute" :class="{ 'bg-blue-400': props.isOpen }">
		<!-- Content inside the dropdown -->
		<slot></slot>
	</div>
</template>
