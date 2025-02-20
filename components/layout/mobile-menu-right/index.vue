<script setup lang="ts">
	import FlexTextSectionDivider from '~/components/shared/FlexTextSectionDivider.vue';
	import AuthModeFeatures from './auth/index.vue';
	import NoAuthModeFeatures from './no-auth/index.vue';
	import LocalizationFeature from './localization/index.vue';
	import ColorThemeFeature from './theme/index.vue';
	import SearchFesture from './search/index.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const props = defineProps<{ isOpen: boolean }>();

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<aside
		class="fixed right-0 top-0 z-50 h-screen min-w-64 bg-white py-2 shadow-lg transition-transform dark:bg-zinc-950 dark:text-white"
		:class="{
			'translate-x-0': props.isOpen,
			'translate-x-72': !props.isOpen,
		}"
	>
		<!-- User is authenticated -->
		<AuthModeFeatures v-if="curUserStore.isAuthenticated" />

		<!-- User is unauthenticated -->
		<NoAuthModeFeatures v-else />

		<!-- Accessibility section -->
		<FlexTextSectionDivider
			text-class="text-gray-500"
			line-class="border-gray-500"
			class="px-2"
		>
			{{ $t('modules.menu-mobile-right.dividers.accessibility') }}
		</FlexTextSectionDivider>

		<div class="flex flex-col gap-4 px-4 py-4">
			<LocalizationFeature />

			<ColorThemeFeature />
		</div>

		<!-- Searchbar -->
		<SearchFesture />

		<!-- Footer -->
		<NuxtLink
			to="https://github.com/chronosgit/ongaku"
			class="absolute bottom-0 left-1/2 mb-1 -translate-x-1/2 text-xs text-black transition-colors hover:text-teal-500"
		>
			@chronosgit
		</NuxtLink>
	</aside>
</template>
