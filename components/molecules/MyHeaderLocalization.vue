<script setup lang="ts">
	import Dropdown from '~/components/molecules/Dropdown.vue';
	import IconLocalization from '~/components/atoms/icons/IconLocalization.vue';

	const { setLocale } = useI18n();

	const { isActive: isLocaleDropdown, toggle: toggleLocaleDropdown } =
		useClickawayClient('localization-ref');
</script>

<template>
	<div ref="localization-ref" class="relative max-w-6">
		<div
			class="max-w-6 cursor-pointer transition-all hover:scale-105 hover:text-black dark:text-white dark:hover:text-white"
			@click.stop="toggleLocaleDropdown()"
		>
			<IconLocalization class="scale-150" />
		</div>

		<!-- Locales dropdown -->
		<Dropdown
			class="bottom-0 left-1/2 right-0 z-20 min-w-24 -translate-x-1/2 translate-y-24 rounded-lg border-[1px] border-[#747373] bg-[#e1e8f2] p-2 transition-transform hover:scale-100 hover:text-black dark:bg-[#121212] dark:hover:text-white"
			:class="{
				'scale-y-100': isLocaleDropdown,
				'scale-y-0': !isLocaleDropdown,
			}"
		>
			<div class="flex flex-col gap-2">
				<button
					class="rounded-lg p-1 transition-colors hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800"
					@click="setLocale('en')"
				>
					English
				</button>

				<button
					class="rounded-lg p-1 transition-colors hover:bg-gray-300 dark:text-white dark:hover:bg-gray-800"
					@click="setLocale('ru')"
				>
					Русский
				</button>
			</div>
		</Dropdown>
	</div>
</template>
