<script setup lang="ts">
	import ColorModeToggle from '~/components/business/ColorModeToggle.vue';
	import MyHeaderDesktopLocalization from './DesktopLocalization.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<div class="flex items-center gap-6">
		<ColorModeToggle />

		<div class="translate-y-0.5">
			<MyHeaderDesktopLocalization />
		</div>

		<template v-if="curUserStore.isAuthenticated">
			<div
				class="cursor-pointer rounded-full bg-red-100 p-1.5 transition-transform hover:scale-105 dark:bg-[#1f1f1f]"
				@click="navigateTo(localePath('/me'))"
			>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-red-400"
				>
					{{ curUserStore.user?.display_name?.slice(0, 1) }}
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
