<script setup lang="ts">
	import DesktopMyHeaderLocalization from '~/components/molecules/DesktopMyHeaderLocalization.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';
	import ColorModeToggle from '~/components/molecules/ColorModeToggle.vue';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<div class="flex items-center gap-6">
		<ColorModeToggle :is-dark="true" />

		<div class="translate-y-0.5">
			<DesktopMyHeaderLocalization />
		</div>

		<template v-if="curUserStore.isAuthenticated">
			<div
				class="cursor-pointer rounded-full bg-red-100 p-1.5 transition-transform hover:scale-105 dark:bg-[#1f1f1f]"
				@click="navigateTo(localePath('/users/me'))"
			>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-red-400"
				>
					{{ curUserStore.user?.display_name.slice(0, 1) }}
				</div>
			</div>
		</template>

		<template v-else>
			<button
				class="rounded-full bg-[#2f2f2f] px-3 py-1 font-bold text-white transition-all hover:scale-105 dark:bg-white dark:text-black"
				@click="navigateTo(localePath('/auth'))"
			>
				{{ $t('modules.header.buttons.auth') }}
			</button>
		</template>
	</div>
</template>
