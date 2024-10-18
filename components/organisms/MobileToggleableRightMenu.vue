<script setup lang="ts">
	const props = defineProps<{ isOpen: boolean }>();
</script>

<template>
	<div
		class="fixed right-0 top-0 z-10 h-screen bg-gradient-to-b from-blue-100 to-gray-200 transition-transform dark:bg-[#121212] dark:bg-none dark:text-white"
	>
		<!-- Authenticated -->
		<template v-if="!true"></template>

		<!-- Unauthenticated -->
		<template v-else>
			<div class="flex flex-col items-center gap-4 px-4 py-6 font-bold">
				<button
					class="text-slate-700 transition-colors hover:scale-105 hover:text-white dark:text-[#c1c1c1]"
					@click="console.log('Register')"
				>
					{{ $t('modules.header.buttons.register') }}
				</button>

				<button
					class="rounded-full px-4 py-2 hover:scale-105 dark:bg-white dark:text-black"
					@click="console.log('Login')"
				>
					{{ $t('modules.header.buttons.login') }}
				</button>
			</div>
		</template>

		<NuxtLink
			to="https://github.com/chronosgit/ongaku"
			class="absolute bottom-0 left-1/2 mb-1 -translate-x-1/2 text-xs text-gray-400 transition-colors hover:text-white"
		>
			@chronosgit
		</NuxtLink>
	</div>
</template>
