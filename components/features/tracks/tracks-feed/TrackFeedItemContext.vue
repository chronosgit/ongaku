<script setup lang="ts">
	const props = defineProps<{
		coords: { x: number | null; y: number | null };
		isVisible: boolean;
	}>();
</script>

<template>
	<Teleport to="body">
		<div
			class="absolute bg-red-400 p-2"
			:class="{
				block: props.isVisible,
				hidden: !props.isVisible,
			}"
			:style="{ top: props.coords.y + 'px', left: props.coords.x + 'px' }"
		>
			Context menu
		</div>
	</Teleport>
</template>
