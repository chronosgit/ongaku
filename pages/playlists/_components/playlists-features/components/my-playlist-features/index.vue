<script setup lang="ts">
	import { IconSettings } from '~/components/ui/icons';
	import EditFeature from './edit.vue';
	import DeleteFeature from './delete.vue';

	const isPlaylistMine = inject<ComputedRef<boolean>>(
		'isPlaylistMine',
		computed(() => false)
	);

	const { isActive: isSettingsDropdown, toggle: toggleSettingsDropdown } =
		useClickawayClient('/playlist/:id.dropdown-settings');
</script>

<template>
	<div v-if="isPlaylistMine" class="relative">
		<!-- Dropdown opener -->
		<ClientOnly>
			<IconSettings
				role="button"
				class="scale-150 cursor-pointer text-zinc-400 transition-all hover:scale-[160%] hover:text-indigo-500 dark:text-zinc-500"
				@mousedown.stop="toggleSettingsDropdown()"
			/>
		</ClientOnly>

		<!--Dropdown with settings -->
		<div
			ref="/playlist/:id.dropdown-settings"
			class="absolute right-0 top-0 z-20 translate-x-0 translate-y-8 rounded-md bg-zinc-100 p-2 shadow-lg transition-all dark:bg-zinc-800"
			:class="{
				'scale-y-100 opacity-100': isSettingsDropdown,
				'scale-y-0 opacity-0': !isSettingsDropdown,
			}"
		>
			<!-- Edit my playlist -->
			<EditFeature />

			<!-- Delete my playlist -->
			<DeleteFeature />
		</div>
	</div>
</template>
