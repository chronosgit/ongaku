<script setup lang="ts">
	const props = defineProps<{ isOpened: boolean }>();
	const emit = defineEmits<{
		(e: 'openOverlay'): void;
		(e: 'closeOverlay'): void;
	}>();

	const { playlists } = useMyFollowedPlaylists();

	const ownPlaylists = computed(() => {
		if (playlists.value != null) console.log(playlists.value);
	});
</script>

<template>
	<Teleport to="body">
		<div
			class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
			:class="{
				'scale-x-100 opacity-100': props.isOpened,
				'scale-x-0 opacity-0': !props.isOpened,
			}"
		>
			<div class="rounded-md bg-white p-2">
				{{ ownPlaylists }}

				<button @click="emit('closeOverlay')">X</button>
			</div>
		</div>
	</Teleport>
</template>
