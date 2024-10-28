<script setup lang="ts">
	import ColorModeToggle from '~/components/shared/ColorModeToggle.vue';
	import Localization from './Localization.vue';
	import Profile from './Profile.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<div class="flex items-center gap-6">
		<ColorModeToggle />

		<Localization />

		<!-- Authenticated -->
		<Profile v-if="curUserStore.isAuthenticated" />

		<!-- Not authenticated -->
		<template v-else>
			<button
				class="rounded-full bg-zinc-950 px-3 py-1 font-bold text-white transition-all hover:scale-105 dark:bg-white dark:text-black"
				@click="navigateTo(localePath('/auth'))"
			>
				{{ $t('modules.header.buttons.auth') }}
			</button>
		</template>
	</div>
</template>
