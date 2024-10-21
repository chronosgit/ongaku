<script setup lang="ts">
	import MenuMobileRight from '~/components/layout/MenuMobileRight.vue';
	import WrapperIconRound from '~/components/utils/WrapperIconRound.vue';
	import LogoOngaku from '~/components/ui/LogoOngaku.vue';
	import {
		IconBurgerMenu,
		IconHouse,
		IconLibrary,
		IconMagnifier,
	} from '~/components/ui/icons';
	import MyHeaderDesktopRightSide from './DesktopRightSide.vue';
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
	<header class="flex items-center justify-between px-2 py-3 dark:bg-black">
		<!-- Left side -->
		<div v-if="curUserStore.isAuthenticated" class="flex items-center gap-3">
			<WrapperIconRound
				class="group cursor-pointer"
				@click="layoutStore.toggleLeftSideVisibility()"
			>
				<IconLibrary
					sizes="40"
					class="scale-125 text-[#b3b3b3] transition-colors group-hover:text-white"
				/>
			</WrapperIconRound>
		</div>

		<LogoOngaku v-else class="w-10 grayscale" />

		<!-- Middle side -->
		<div class="flex items-center gap-3">
			<WrapperIconRound
				class="group cursor-pointer"
				@click="navigateTo(localePath('/'))"
			>
				<IconHouse
					class="scale-150 text-[#b3b3b3] transition-colors group-hover:text-white"
				/>
			</WrapperIconRound>

			<!-- TODO: super-responsive searchbar with logic -->
			<WrapperIconRound
				v-if="curUserStore.isAuthenticated"
				class="group cursor-pointer"
			>
				<IconMagnifier
					class="scale-150 text-[#b3b3b3] transition-colors group-hover:text-white"
				/>
			</WrapperIconRound>
		</div>

		<!-- Right side -->
		<!-- Mobile -->
		<WrapperIconRound class="group cursor-pointer md:hidden" @click="open()">
			<IconBurgerMenu
				class="scale-150 text-[#b3b3b3] transition-colors group-hover:text-white"
			/>
		</WrapperIconRound>

		<Teleport to="body">
			<MenuMobileRight
				:is-open="isActive"
				ref="mobile-toggleable-right-menu-ref"
				class="md:hidden"
			/>
		</Teleport>

		<!-- Right side -->
		<!-- Desktop -->
		<MyHeaderDesktopRightSide class="hidden md:flex" />
	</header>
</template>
