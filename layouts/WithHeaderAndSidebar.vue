<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import UnauthenticationGuard from '~/components/organisms/UnauthenticationGuard.vue';
	import LibrarySidebar from '~/components/organisms/LibrarySidebar.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<Default>
		<div class="max-h-screen overflow-hidden">
			<MyHeader />

			<template v-if="curUserStore.isAuthenticated">
				<div class="relative h-screen">
					<LibrarySidebar />

					<slot></slot>
				</div>
			</template>

			<template v-else>
				<UnauthenticationGuard />
			</template>
		</div>
	</Default>
</template>
