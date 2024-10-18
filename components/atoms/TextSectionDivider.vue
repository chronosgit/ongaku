<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			lineClass?: string; // tw border
			textClass?: string; // tw
		}>(),
		{
			lineClass: 'border-black',
			textClass: ' text-black',
		}
	);
</script>

<template>
	<div class="flex items-center">
		<div class="flex-grow border-t" :class="props.lineClass"></div>

		<span class="mx-2 text-xs uppercase" :class="props.textClass">
			<slot></slot>
		</span>

		<div class="flex-grow border-t" :class="props.lineClass"></div>
	</div>
</template>
