<script setup lang="ts">
	import { IconMoon, IconSun } from '~/components/ui/icons';
	import { useColorModeStore } from '~/store/useColorModeStore';

	const colorModeStore = useColorModeStore();
</script>

<template>
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
</template>
