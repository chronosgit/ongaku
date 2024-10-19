<script setup lang="ts">
	import MyHeaderLocalization from '~/components/molecules/MyHeaderLocalization.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const localePath = useLocalePath();

	const { isAuthenticated } = useCurrentUserStore();
</script>

<template>
	<div class="flex items-center gap-6">
		<MyHeaderLocalization />

		<template v-if="isAuthenticated">
			<div
				class="cursor-pointer rounded-full bg-red-100 p-1.5 transition-transform hover:scale-105 dark:bg-[#1f1f1f]"
			>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-full bg-red-400"
				>
					K
				</div>
			</div>
		</template>

		<template v-else>
			<button
				class="rounded-full bg-[#2f2f2f] px-3 py-1 text-lg font-bold text-white transition-all hover:scale-105 dark:bg-white dark:text-black"
				@click="navigateTo(localePath('/auth'))"
			>
				{{ $t('modules.header.buttons.auth') }}
			</button>
		</template>
	</div>
</template>
