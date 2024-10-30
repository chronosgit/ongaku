<script setup lang="ts">
	const props = defineProps<{
		name: string;
		type: string;
		owner: string;
	}>();
</script>

<template>
	<div
		class="absolute left-0 hidden max-w-max translate-x-20 overflow-hidden rounded-md bg-zinc-300 p-2 dark:bg-zinc-800"
	>
		<p>{{ props.name }}</p>

		<div class="text-ellipsis whitespace-nowrap text-xs dark:text-gray-400">
			{{ $t(`dictionary.${props.type}.one`) }} &#x2022; {{ props.owner }}
		</div>
	</div>
</template>
