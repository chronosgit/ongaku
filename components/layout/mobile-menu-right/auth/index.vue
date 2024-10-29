<script setup lang="ts">
	import { IconDoorOpen, IconUser } from '~/components/ui/icons';
	import FlexTextSectionDivider from '~/components/shared/FlexTextSectionDivider.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';
	import AuthService from '~/services/AuthService';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();

	const logout = async () => {
		AuthService.logout().then(() => curUserStore.disauthenticate());
	};
</script>

<template>
	<FlexTextSectionDivider
		text-class="text-gray-500"
		line-class="border-gray-500"
		class="px-2"
	>
		{{ $t('modules.menu-mobile-right.dividers.profile') }}
	</FlexTextSectionDivider>

	<!-- Visit my profile -->
	<div
		class="flex cursor-pointer items-center gap-2 p-4 pb-0 text-zinc-400 transition-all hover:scale-105 hover:text-indigo-500"
		@click="navigateTo(localePath('/me'))"
	>
		<ClientOnly>
			<IconUser class="scale-125" />
		</ClientOnly>

		<p class="font-bold">
			{{ $t('modules.menu-mobile-right.buttons.profile') }}
		</p>
	</div>

	<!-- Logout -->
	<div
		class="flex cursor-pointer items-center gap-2 p-4 text-zinc-400 transition-all hover:scale-105 hover:text-indigo-500"
		@click="logout()"
	>
		<ClientOnly>
			<IconDoorOpen class="scale-125" />
		</ClientOnly>

		<p class="font-bold">
			{{ $t('modules.menu-mobile-right.buttons.logout') }}
		</p>
	</div>
</template>
