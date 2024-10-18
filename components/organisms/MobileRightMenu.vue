<script setup lang="ts">
	import TextSectionDivider from '~/components/atoms/TextSectionDivider.vue';
	import IconUserPlus from '~/components/atoms/icons/IconUserPlus.vue';
	import IconDoorOpen from '~/components/atoms/icons/IconDoorOpen.vue';
	import IconLocalization from '~/components/atoms/icons/IconLocalization.vue';
	import IconSun from '~/components/atoms/icons/IconSun.vue';
	import { useColorModeStore } from '~/store/useColorModeStore';
	import IconMoon from '../atoms/icons/IconMoon.vue';

	const props = defineProps<{ isOpen: boolean }>();

	const colorModeStore = useColorModeStore();
</script>

<template>
	<div
		class="fixed right-0 top-0 z-10 h-screen bg-gradient-to-b from-gray-200 to-blue-100 py-2 transition-transform dark:bg-[#121212] dark:bg-none dark:text-white"
		:class="{ 'translate-x-0': props.isOpen, 'translate-x-72': !props.isOpen }"
	>
		<!-- Authenticated -->
		<template v-if="!true"></template>

		<!-- User is unauthenticated -->
		<!-- Authentication section -->
		<template v-else>
			<TextSectionDivider
				text-class="text-gray-500"
				line-class="border-gray-500"
				class="px-2"
			>
				{{ $t('modules.mobile-right-menu.dividers.auth') }}
			</TextSectionDivider>

			<div class="flex flex-col gap-4 px-4 py-4">
				<!-- Registration option -->
				<div
					class="flex items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
				>
					<ClientOnly>
						<IconUserPlus class="scale-125" />
					</ClientOnly>

					<button class="font-bold" @click="console.log('Sign up')">
						{{ $t('modules.mobile-right-menu.buttons.register') }}
					</button>
				</div>

				<!-- Login option -->
				<div
					class="flex items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
				>
					<ClientOnly>
						<IconDoorOpen class="scale-125" />
					</ClientOnly>

					<button class="font-bold" @click="console.log('Login')">
						{{ $t('modules.mobile-right-menu.buttons.login') }}
					</button>
				</div>
			</div>
		</template>

		<!-- Accessibility section -->
		<TextSectionDivider
			text-class="text-gray-500"
			line-class="border-gray-500"
			class="px-2"
		>
			{{ $t('modules.mobile-right-menu.dividers.accessibility') }}
		</TextSectionDivider>

		<div class="flex flex-col gap-4 px-4 py-4">
			<!-- Localization option -->
			<div
				class="flex items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
			>
				<ClientOnly>
					<IconLocalization class="scale-150" />
				</ClientOnly>

				<button class="font-bold" @click="console.log('Language')">
					{{ $t('modules.mobile-right-menu.buttons.translate') }}
				</button>
			</div>

			<!-- Theme option -->
			<div
				class="flex items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-black dark:hover:text-white"
			>
				<ClientOnly>
					<IconMoon v-show="colorModeStore.isDarkMode" class="scale-125" />
					<IconSun v-show="!colorModeStore.isDarkMode" class="scale-125" />
				</ClientOnly>

				<button class="font-bold" @click="colorModeStore.toggleMode()">
					{{ $t('modules.mobile-right-menu.buttons.theme') }}
				</button>
			</div>
		</div>

		<!-- Footer -->
		<NuxtLink
			to="https://github.com/chronosgit/ongaku"
			class="absolute bottom-0 left-1/2 mb-1 -translate-x-1/2 text-xs text-gray-400 transition-colors hover:text-white"
		>
			@chronosgit
		</NuxtLink>
	</div>
</template>
