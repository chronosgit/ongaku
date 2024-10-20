<script setup lang="ts">
	import MobileRightMenu from '~/components/organisms/MobileRightMenu.vue';
	import DesktopMyHeaderRightSide from '~/components/molecules/DesktopMyHeaderRightSide.vue';
	import IconBurgerMenu from '~/components/atoms/icons/IconBurgerMenu.vue';
	import IconHouse from '~/components/atoms/icons/IconHouse.vue';
	import IconMagnifier from '~/components/atoms/icons/IconMagnifier.vue';
	import IconLibrary from '~/components/atoms/icons/IconLibrary.vue';
	import IconRoundWrapper from '~/components/atoms/IconRoundWrapper.vue';
	import OngakuLogo from '~/components/atoms/OngakuLogo.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();
	const layoutStore = useLayoutStore();

	const { isActive, activate: open } = useClickawayClient(
		'mobile-toggleable-right-menu-ref'
	);
</script>

<template>
	<header
		class="flex h-full max-h-16 items-center justify-between px-2 py-3 dark:bg-black"
	>
		<!-- Left side -->
		<div v-if="curUserStore.isAuthenticated" class="flex items-center gap-3">
			<IconRoundWrapper
				class="group cursor-pointer"
				@click="layoutStore.toggleLeftSideVisibility()"
			>
				<IconLibrary
					sizes="40"
					class="scale-125 text-[#b3b3b3] transition-colors group-hover:text-white"
				/>
			</IconRoundWrapper>
		</div>

		<OngakuLogo v-else class="w-10 grayscale" />

		<!-- Middle side -->
		<div class="flex items-center gap-3">
			<IconRoundWrapper
				class="group cursor-pointer"
				@click="navigateTo(localePath('/'))"
			>
				<IconHouse
					class="scale-150 text-[#b3b3b3] transition-colors group-hover:text-white"
				/>
			</IconRoundWrapper>

			<!-- TODO: super-responsive searchbar with logic -->
			<IconRoundWrapper
				v-if="curUserStore.isAuthenticated"
				class="group cursor-pointer"
			>
				<IconMagnifier
					class="scale-150 text-[#b3b3b3] transition-colors group-hover:text-white"
				/>
			</IconRoundWrapper>
		</div>

		<!-- Right side -->
		<!-- Mobile -->
		<IconRoundWrapper class="group cursor-pointer md:hidden" @click="open()">
			<IconBurgerMenu
				class="scale-150 text-[#b3b3b3] transition-colors group-hover:text-white"
			/>
		</IconRoundWrapper>

		<Teleport to="body">
			<MobileRightMenu
				:is-open="isActive"
				ref="mobile-toggleable-right-menu-ref"
				class="md:hidden"
			/>
		</Teleport>

		<!-- Right side -->
		<!-- Desktop -->
		<DesktopMyHeaderRightSide class="hidden md:flex" />
	</header>
</template>
