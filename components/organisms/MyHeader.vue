<script setup lang="ts">
	import MobileRightMenu from '~/components/organisms/MobileRightMenu.vue';
	import MyHeaderRightSide from '~/components/molecules/MyHeaderRightSide.vue';
	import IconBurgerMenu from '~/components/atoms/icons/IconBurgerMenu.vue';
	import IconHouse from '~/components/atoms/icons/IconHouse.vue';
	import IconMagnifier from '~/components/atoms/icons/IconMagnifier.vue';
	import OngakuLogo from '~/components/atoms/OngakuLogo.vue';

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
		<!-- Left side -->
		<div class="flex items-center gap-6">
			<OngakuLogo sizes="48" class="grayscale dark:grayscale-0" />

			<div
				class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3 transition-transform hover:scale-105"
				@click="onHouseClick()"
			>
				<IconHouse class="scale-150 text-white dark:text-[#b3b3b3]" />
			</div>
		</div>

		<!-- Middle side -->
		<!-- TODO: super-responsive searchbar with logic -->
		<div
			class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3 transition-transform hover:scale-105"
			@click="console.log('Big dreams')"
		>
			<IconMagnifier class="scale-150 text-white dark:text-[#b3b3b3]" />
		</div>

		<!-- Right side -->
		<!-- Mobile -->
		<div
			class="flex cursor-pointer items-center justify-center rounded-full bg-[#2f2f2f] p-3 transition-transform hover:scale-105 md:hidden"
			@click="open()"
		>
			<IconBurgerMenu class="scale-150 text-white dark:text-[#b3b3b3]" />
		</div>

		<!-- Mobile toggleable right-side menu -->
		<Teleport to="body">
			<MobileRightMenu
				:is-open="isActive"
				ref="mobile-toggleable-right-menu-ref"
				class="md:hidden"
			/>
		</Teleport>

		<!-- Right side -->
		<!-- Desktop -->
		<MyHeaderRightSide class="hidden md:flex" />
	</header>
</template>
