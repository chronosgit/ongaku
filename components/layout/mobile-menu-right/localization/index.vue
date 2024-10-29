<script setup lang="ts">
	import {
		IconArrowDown,
		IconArrowUp,
		IconLocalization,
	} from '~/components/ui/icons';

	const { setLocale } = useI18n();

	const { isActive: isLocaleDropdown, toggle: toggleLocaleDropdown } =
		useClickawayClient('localization-ref');
</script>

<template>
	<!-- Localization option -->
	<div ref="localization-ref" class="relative">
		<!-- Dropdown opener -->
		<div
			class="flex cursor-pointer items-center justify-between gap-1 text-zinc-400 transition-all hover:scale-105 hover:text-indigo-500"
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
		<div
			class="absolute bottom-0 left-0 right-0 z-20 translate-y-24 rounded-lg bg-zinc-100 p-2 transition-transform hover:scale-100 hover:text-black dark:bg-zinc-800 dark:hover:text-white"
			:class="{
				'scale-y-100': isLocaleDropdown,
				'scale-y-0': !isLocaleDropdown,
			}"
		>
			<div class="s flex flex-col gap-2">
				<button
					class="rounded-lg p-1 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
					@click="setLocale('en')"
				>
					English
				</button>

				<button
					class="rounded-lg p-1 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900"
					@click="setLocale('ru')"
				>
					Русский
				</button>
			</div>
		</div>
	</div>
</template>
