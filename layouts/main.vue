<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const MyHeader = defineAsyncComponent(
		() => import('~/components/layout/my-header/index.vue')
	);
	const SidebarLibrary = defineAsyncComponent(
		() => import('~/components/layout/sidebar-library/index.vue')
	);
	const MusicPlayer = defineAsyncComponent(
		() => import('~/components/layout/music-player/index.vue')
	);

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<Default>
		<!-- Authenticated layout -->
		<template v-if="curUserStore.isAuthenticated">
			<div class="relative h-screen max-h-screen">
				<main class="relative h-[90%]">
					<MyHeader class="h-[8%]" />

					<SidebarLibrary class="h-[90%]" />

					<div class="h-[92%] p-2 dark:bg-black">
						<slot></slot>
					</div>
				</main>

				<MusicPlayer class="h-[10%]" />
			</div>
		</template>

		<!-- Unauthenticated layout -->
		<template v-else>
			<MyHeader />

			<div
				class="flex h-screen flex-col items-center justify-center gap-4 dark:bg-black"
			>
				<h1 class="text-3xl font-bold dark:text-white">
					{{ $t('modules.unauthentication-guard.oops') }}
				</h1>

				<p class="text-lg dark:text-gray-400">
					{{ $t('modules.unauthentication-guard.feedback-p1') }}

					<NuxtLink
						:to="localePath('/auth')"
						class="text-blue-500 transition-colors hover:text-blue-700"
					>
						{{ $t('modules.unauthentication-guard.feedback-p2') }}
					</NuxtLink>

					{{ $t('modules.unauthentication-guard.feedback-p3') }}
				</p>
			</div>
		</template>
	</Default>
</template>
