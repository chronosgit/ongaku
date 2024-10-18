<script setup lang="ts">
	import TextSectionDivider from '~/components/atoms/TextSectionDivider.vue';
	import IconUserPlus from '~/components/atoms/icons/IconUserPlus.vue';
	import IconDoorOpen from '~/components/atoms/icons/IconDoorOpen.vue';

	const props = defineProps<{ isOpen: boolean }>();
</script>

<template>
	<div
		class="fixed right-0 top-0 z-10 h-screen bg-gradient-to-b from-blue-100 to-gray-200 py-2 transition-transform dark:bg-[#121212] dark:bg-none dark:text-white"
		:class="{ 'translate-x-0': props.isOpen, 'translate-x-72': !props.isOpen }"
	>
		<!-- Authenticated -->
		<template v-if="!true"></template>

		<!-- Unauthenticated -->
		<template v-else>
			<TextSectionDivider
				text-class="text-gray-500"
				line-class="border-gray-500"
				class="px-2"
			>
				{{ $t('modules.mobile-right-menu.dividers.auth') }}
			</TextSectionDivider>

			<div class="flex flex-col gap-4 px-4 py-4">
				<!-- Registration -->
				<div
					class="flex items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-white"
				>
					<ClientOnly>
						<IconUserPlus class="scale-125" />
					</ClientOnly>

					<button class="font-bold" @click="console.log('Sign up')">
						{{ $t('modules.mobile-right-menu.buttons.register') }}
					</button>
				</div>

				<!-- Login -->
				<div
					class="flex items-center gap-2 text-gray-400 transition-all hover:scale-105 hover:text-white"
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

		<div class="mt-8">
			<TextSectionDivider
				text-class="text-gray-500"
				line-class="border-gray-500"
				class="px-2"
			>
				{{ $t('modules.mobile-right-menu.dividers.accessibility') }}
			</TextSectionDivider>
		</div>

		<NuxtLink
			to="https://github.com/chronosgit/ongaku"
			class="absolute bottom-0 left-1/2 mb-1 -translate-x-1/2 text-xs text-gray-400 transition-colors hover:text-white"
		>
			@chronosgit
		</NuxtLink>
	</div>
</template>
