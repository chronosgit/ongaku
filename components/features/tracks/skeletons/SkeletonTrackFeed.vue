<script setup lang="ts">
	const props = defineProps<{ skeletonItemsTotal?: number }>();

	const skeletonTw = 'bg-zinc-300 animate-pulse';
</script>

<template>
	<div class="space-y-4">
		<div
			v-for="_ in props.skeletonItemsTotal || 10"
			class="flex items-center gap-2"
		>
			<!-- Cover image placeholder -->
			<div class="h-12 w-12 shrink-0 rounded-md" :class="skeletonTw" />

			<!-- Name and artists -->
			<div class="grid w-full gap-2">
				<div class="h-4 w-full" :class="skeletonTw" />

				<div class="h-4 w-1/2" :class="skeletonTw" />
			</div>
		</div>
	</div>
</template>
