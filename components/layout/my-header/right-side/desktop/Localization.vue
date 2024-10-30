<script setup lang="ts">
	import { IconLocalization } from '~/components/ui/icons';

	const { setLocale } = useI18n();

	const { isActive: isLocaleDropdown, toggle: toggleLocaleDropdown } =
		useClickawayClient('localization-ref');
</script>

<template>
	<div ref="localization-ref" class="relative max-w-6 translate-y-0.5">
		<div
			class="max-w-6 cursor-pointer text-gray-500 transition-all hover:scale-105 hover:text-indigo-400 dark:text-zinc-400"
			@click.stop="toggleLocaleDropdown()"
		>
			<ClientOnly>
				<IconLocalization class="scale-150" />
			</ClientOnly>
		</div>

		<!-- Locales dropdown -->
		<div
			ref="localization-ref"
			class="z-90 absolute bottom-0 left-1/2 right-0 min-w-24 -translate-x-1/2 translate-y-24 rounded-lg bg-zinc-100 p-2 shadow-md transition-transform hover:scale-100 dark:bg-zinc-900 dark:hover:text-white"
			:class="{
				'scale-y-100': isLocaleDropdown,
				'scale-y-0': !isLocaleDropdown,
			}"
		>
			<div class="flex flex-col gap-2">
				<button
					class="cursor-pointer rounded-lg p-1 transition-colors hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800"
					@click="setLocale('en')"
				>
					English
				</button>

				<button
					class="cursor-pointer rounded-lg p-1 transition-colors hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800"
					@click="setLocale('ru')"
				>
					Русский
				</button>
			</div>
		</div>
	</div>
</template>
