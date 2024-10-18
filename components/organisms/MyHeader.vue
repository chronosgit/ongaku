<script setup lang="ts">
	import IconHouse from '../atoms/IconHouse.vue';
	import OngakuLogo from '../atoms/OngakuLogo.vue';

	const { locale } = useI18n();

	const onHouseClick = async () => await navigateTo(`/${locale.value}`);
</script>

<template>
	<header class="flex items-center justify-between p-1 dark:bg-black">
		<div class="flex items-center gap-4">
			<OngakuLogo sizes="48" class="grayscale dark:grayscale-0" />

			<div class="flex items-center gap-2">
				<div
					class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3"
					@click="onHouseClick()"
				>
					<IconHouse class="scale-150 text-white dark:text-[#b3b3b3]" />
				</div>

				<!-- Search (super responsive) -->
			</div>
		</div>

		<!-- Authenticated -->
		<template v-if="true"></template>

		<!-- Unauthenticated -->
		<template v-else>
			<div class="">
				<!-- Register button -->

				<!-- Login button -->
			</div>
		</template>
	</header>
</template>
