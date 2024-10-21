<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/layout/my-header/index.vue';
	import SidebarLibrary from '~/components/layout/sidebar-library/index.vue';
	import MusicPlayer from '~/components/layout/MusicPlayer.vue';
	import UnauthenticationGuard from '~/components/page/UnauthenticationGuard.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<Default>
		<!-- Authenticated layout -->
		<template v-if="curUserStore.isAuthenticated">
			<div class="relative h-screen max-h-screen">
				<div class="relative h-[90%]">
					<MyHeader class="h-[8%]" />

					<SidebarLibrary class="h-[90%]" />

					<div class="h-[92%] p-2 dark:bg-black">
						<slot></slot>
					</div>
				</div>

				<MusicPlayer class="h-[10%]" />
			</div>
		</template>

		<!-- Unauthenticated layout -->
		<template v-else>
			<MyHeader />

			<UnauthenticationGuard />
		</template>
	</Default>
</template>
