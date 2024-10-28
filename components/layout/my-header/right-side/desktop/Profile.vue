<script setup lang="ts">
	import { IconDoorOpen, IconUser } from '~/components/ui/icons';
	import AuthService from '~/services/AuthService';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();

	const {
		isActive: isDropdown,
		disactivate: closeDropdown,
		toggle: toggleDropdown,
	} = useClickawayClient('my-header-desktop-right-side-avatar');

	const avatar = computed(() => {
		const avatars = curUserStore.user?.images;

		if (!Array.isArray(avatars) || !avatars.length) return '';

		return avatars[avatars.length - 1];
	});

	const visitMyProfile = () => {
		closeDropdown();
		navigateTo(localePath('/me'));
	};

	const logout = async () => {
		AuthService.logout().then(() => {
			curUserStore.disauthenticate();
			closeDropdown();
		});
	};
</script>

<template>
	<div
		class="relative cursor-pointer rounded-full bg-zinc-200 p-1.5 dark:bg-[#1f1f1f]"
	>
		<!-- Avatar container -->
		<div class="group/avatar" @mousedown.left.stop="toggleDropdown()">
			<!-- Real image -->
			<NuxtImg
				v-if="avatar"
				:src="avatar.url"
				class="h-8 w-8 rounded-full transition-transform group-hover/avatar:scale-105"
			/>

			<!-- Placeholder -->
			<div
				v-else
				class="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 transition-all group-hover/avatar:bg-zinc-300 dark:bg-zinc-500 dark:group-hover/avatar:bg-zinc-400"
			>
				{{ curUserStore.user?.display_name?.slice(0, 1) }}
			</div>
		</div>

		<!-- Dropdown -->
		<div
			ref="my-header-desktop-right-side-avatar"
			class="absolute right-0 top-0 z-20 translate-y-12 space-y-4 rounded-sm bg-zinc-300 px-3 py-2 shadow-lg transition-transform dark:bg-zinc-800"
			:class="{
				'scale-y-100 opacity-100': isDropdown,
				'scale-y-0 opacity-0': !isDropdown,
			}"
		>
			<!-- Visit profile -->
			<div
				class="flex items-center gap-2 text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
				@click.stop="visitMyProfile()"
			>
				<ClientOnly>
					<IconUser class="scale-125" />
				</ClientOnly>

				<p class="text-nowrap font-bold">
					{{ $t('modules.menu-mobile-right.buttons.profile') }}
				</p>
			</div>

			<!-- Logout -->
			<div
				class="flex items-center gap-2 text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
				@click.stop="logout()"
			>
				<ClientOnly>
					<IconDoorOpen class="scale-125" />
				</ClientOnly>

				<p class="text-nowrap font-bold">
					{{ $t('modules.menu-mobile-right.buttons.logout') }}
				</p>
			</div>
		</div>
	</div>
</template>
