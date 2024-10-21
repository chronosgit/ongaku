<script setup lang="ts">
	import { IconMoon, IconSun } from '~/components/ui/icons';
	import { useColorModeStore } from '~/store/useColorModeStore';

	const colorModeStore = useColorModeStore();
</script>

<template>
	<div
		class="w-12 cursor-pointer rounded-full border-[1px] bg-[#eff0f3] py-0.5 transition-colors hover:border-red-300 dark:border-[#717272] dark:bg-[#2b2b2b]"
		@click="colorModeStore.toggleMode"
	>
		<div
			class="flex max-h-5 max-w-5 items-center justify-center rounded-full bg-white p-1 text-black transition-transform dark:bg-black dark:text-white"
			:class="{
				'translate-x-1': colorModeStore.isDarkMode,
				'translate-x-6': !colorModeStore.isDarkMode,
			}"
		>
			<IconMoon v-show="colorModeStore.isDarkMode" />

			<IconSun v-show="!colorModeStore.isDarkMode" />
		</div>
	</div>
</template>
