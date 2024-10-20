<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import UnauthenticationGuard from '~/components/organisms/UnauthenticationGuard.vue';
	import LibrarySidebar from '~/components/organisms/LibrarySidebar.vue';
	import MusicPlayer from '~/components/organisms/MusicPlayer.vue';
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

					<LibrarySidebar class="h-[90%]" />

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
