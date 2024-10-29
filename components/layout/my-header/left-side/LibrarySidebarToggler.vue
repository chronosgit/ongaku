<script setup lang="ts">
	import { IconLibrary } from '~/components/ui/icons';
	import WrapperIconRound from '~/components/ui/WrapperIconRound.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';
	import { useLayoutStore } from '~/store/useLayoutStore';

	const curUserStore = useCurrentUserStore();
	const layoutStore = useLayoutStore();
</script>

<template>
	<WrapperIconRound
		v-if="curUserStore.isAuthenticated"
		class="cursor-pointer p-2"
		@click="layoutStore.toggleLeftSideVisibility()"
	>
		<ClientOnly><IconLibrary sizes="40" class="scale-125" /></ClientOnly>
	</WrapperIconRound>
</template>
