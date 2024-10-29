<script setup lang="ts">
	import FlexTextSectionDivider from '~/components/shared/FlexTextSectionDivider.vue';
	import { IconDoorOpen } from '~/components/ui/icons';

	const localePath = useLocalePath();
</script>

<template>
	<FlexTextSectionDivider
		text-class="text-zinc-500"
		line-class="border-zinc-500"
		class="px-2"
	>
		{{ $t('modules.menu-mobile-right.dividers.auth') }}
	</FlexTextSectionDivider>

	<!-- Visit authentication page -->
	<div
		class="flex cursor-pointer items-center gap-2 p-4 text-zinc-400 transition-all hover:scale-105 hover:text-indigo-500"
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
