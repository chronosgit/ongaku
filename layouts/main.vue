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
		<div class="max-h-screen overflow-hidden">
			<MyHeader />

			<template v-if="curUserStore.isAuthenticated">
				<div class="relative">
					<div class="h-5/6">
						<div class="absolute">
							<LibrarySidebar />
						</div>

						<slot></slot>
					</div>

					<MusicPlayer />
				</div>
			</template>

			<template v-else>
				<UnauthenticationGuard />
			</template>
		</div>
	</Default>
</template>
