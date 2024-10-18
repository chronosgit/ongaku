<script setup lang="ts">
	import IconBurgerMenu from '~/components/atoms/IconBurgerMenu.vue';
	import IconHouse from '~/components/atoms/IconHouse.vue';
	import IconMagnifier from '~/components/atoms/IconMagnifier.vue';
	import OngakuLogo from '~/components/atoms/OngakuLogo.vue';
	import MobileToggleableRightMenu from '~/components/organisms/MobileToggleableRightMenu.vue';

	const { locale } = useI18n();

	const {
		isActive,
		activate: open,
		disactivate: close,
		toggle,
	} = useClickawayClient('mobile-toggleable-right-menu-ref');

	const onHouseClick = async () => await navigateTo(`/${locale.value}`);
</script>

<template>
	<header class="flex items-center justify-between px-2 py-1 dark:bg-black">
		<div class="flex items-center gap-6">
			<OngakuLogo sizes="48" class="grayscale dark:grayscale-0" />

			<div class="flex items-center gap-2">
				<div
					class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3 transition-transform hover:scale-105"
					@click="onHouseClick()"
				>
					<IconHouse class="scale-150 text-white dark:text-[#b3b3b3]" />
				</div>

				<!-- TODO: super-responsive searchbar with logic -->
				<div
					class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3 transition-transform hover:scale-105"
					@click="console.log('Big dreams')"
				>
					<IconMagnifier class="scale-150 text-white dark:text-[#b3b3b3]" />
				</div>
			</div>
		</div>

		<div
			class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3 transition-transform hover:scale-105"
			@click="open()"
		>
			<IconBurgerMenu class="scale-150 text-white dark:text-[#b3b3b3]" />
		</div>

		<Teleport to="body">
			<MobileToggleableRightMenu
				ref="mobile-toggleable-right-menu-ref"
				:is-open="isActive"
			/>
		</Teleport>
	</header>
</template>
