<script setup lang="ts">
	const props = defineProps<{
		name: string;
		type: string;
		owner: string;
	}>();
</script>

<template>
	<div
		class="absolute left-0 hidden max-w-max translate-x-20 overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-[#dfdfdf] p-2 shadow-md shadow-gray-300 dark:bg-[#292929] dark:shadow-[#1a1a1a]"
	>
		<p>{{ props.name }}</p>

		<div class="text-xs dark:text-gray-400">
			{{ $t(`dictionary.${props.type}.one`) }} &#x2022; {{ props.owner }}
		</div>
	</div>
</template>
