<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/layout/my-header/index.vue';
	import SidebarLibrary from '~/components/layout/sidebar-library/index.vue';
	import MusicPlayer from '~/_migration/layout/music-player/index.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

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
