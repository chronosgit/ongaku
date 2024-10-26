<script setup lang="ts">
	import Dropdown from '~/components/utils/Dropdown.vue';
	import FlexTextSectionDivider from '~/components/ui/FlexTextSectionDivider.vue';
	import {
		IconArrowDown,
		IconArrowUp,
		IconDoorOpen,
		IconLocalization,
		IconMoon,
		IconSun,
		IconUser,
	} from '~/components/ui/icons';
	import { useColorModeStore } from '~/store/useColorModeStore';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const props = defineProps<{ isOpen: boolean }>();

	const { setLocale } = useI18n();
	const localePath = useLocalePath();

	const colorModeStore = useColorModeStore();
	const useCurUserStore = useCurrentUserStore();

	const { isActive: isLocaleDropdown, toggle: toggleLocaleDropdown } =
		useClickawayClient('localization-ref');
</script>

<template>
	<div
		class="fixed right-0 top-0 z-50 h-screen min-w-64 bg-gradient-to-b from-gray-200 to-blue-100 py-2 transition-transform dark:bg-[#121212] dark:bg-none dark:text-white"
		:class="{
			'translate-x-0': props.isOpen,
			'translate-x-72': !props.isOpen,
		}"
	>
		<!-- User is authenticated -->
		<!-- Profile section -->
		<template v-if="useCurUserStore.isAuthenticated">
			<FlexTextSectionDivider
				text-class="text-gray-500"
				line-class="border-gray-500"
				class="px-2"
			>
				{{ $t('modules.menu-mobile-right.dividers.profile') }}
			</FlexTextSectionDivider>

			<div
				class="flex cursor-pointer items-center gap-2 p-4 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
			>
				<ClientOnly>
					<div class="scale-125">
						<IconUser />
					</div>
				</ClientOnly>

				<NuxtLink :to="localePath('/me')" class="font-bold">
					{{ $t('modules.menu-mobile-right.buttons.profile') }}
				</NuxtLink>
			</div>
		</template>

		<!-- User is unauthenticated -->
		<!-- Authentication section -->
		<template v-else>
			<FlexTextSectionDivider
				text-class="text-gray-500"
				line-class="border-gray-500"
				class="px-2"
			>
				{{ $t('modules.menu-mobile-right.dividers.auth') }}
			</FlexTextSectionDivider>

			<div
				class="flex cursor-pointer items-center gap-2 p-4 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
				@click="navigateTo(localePath('/auth'))"
			>
				<ClientOnly>
					<IconDoorOpen class="scale-125" />
				</ClientOnly>

				<p class="font-bold">
					{{ $t('modules.menu-mobile-right.buttons.auth') }}
				</p>
			</div>
		</template>

		<!-- Accessibility section -->
		<FlexTextSectionDivider
			text-class="text-gray-500"
			line-class="border-gray-500"
			class="px-2"
		>
			{{ $t('modules.menu-mobile-right.dividers.accessibility') }}
		</FlexTextSectionDivider>

		<div class="flex flex-col gap-4 px-4 py-4">
			<!-- Localization option -->
			<div ref="localization-ref" class="relative">
				<div
					class="flex cursor-pointer items-center justify-between gap-1 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
					@click.stop="toggleLocaleDropdown()"
				>
					<div class="flex items-center gap-2">
						<ClientOnly>
							<IconLocalization class="scale-150" />
						</ClientOnly>

						<button class="font-bold">
							{{ $t('modules.menu-mobile-right.buttons.translate') }}
						</button>
					</div>

					<ClientOnly>
						<IconArrowUp v-show="isLocaleDropdown" class="scale-125" />
						<IconArrowDown v-show="!isLocaleDropdown" class="scale-125" />
					</ClientOnly>
				</div>

				<!-- Locales dropdown -->
				<Dropdown
					class="bottom-0 left-0 right-0 z-20 translate-y-24 rounded-lg border-[1px] border-[#747373] bg-[#e1e8f2] p-2 transition-transform hover:scale-100 hover:text-black dark:bg-[#121212] dark:hover:text-white"
					:class="{
						'scale-y-100': isLocaleDropdown,
						'scale-y-0': !isLocaleDropdown,
					}"
				>
					<div class="s flex flex-col gap-2">
						<button
							class="rounded-lg p-1 transition-colors hover:bg-gray-300 dark:hover:bg-gray-800"
							@click="setLocale('en')"
						>
							English
						</button>

						<button
							class="rounded-lg p-1 transition-colors hover:bg-gray-300 dark:hover:bg-gray-800"
							@click="setLocale('ru')"
						>
							Русский
						</button>
					</div>
				</Dropdown>
			</div>

			<!-- Color mode option -->
			<div
				class="flex cursor-pointer items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
				@click="colorModeStore.toggleMode()"
			>
				<ClientOnly>
					<IconMoon v-show="colorModeStore.isDarkMode" class="scale-125" />
					<IconSun v-show="!colorModeStore.isDarkMode" class="scale-125" />
				</ClientOnly>

				<button class="font-bold">
					{{ $t('modules.menu-mobile-right.buttons.theme') }}
				</button>
			</div>
		</div>

		<!-- Footer -->
		<NuxtLink
			to="https://github.com/chronosgit/ongaku"
			class="absolute bottom-0 left-1/2 mb-1 -translate-x-1/2 text-xs text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-white"
		>
			@chronosgit
		</NuxtLink>
	</div>
</template>
