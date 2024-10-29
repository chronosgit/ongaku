<script setup lang="ts">
	import { IconHouse, IconMagnifier } from '~/components/ui/icons';
	import WrapperIconRound from '~/components/ui/WrapperIconRound.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();
</script>

<template>
	<section class="flex items-center gap-3">
		<!-- To / page -->
		<WrapperIconRound
			class="cursor-pointer p-2"
			@click="navigateTo(localePath('/'))"
		>
			<ClientOnly><IconHouse class="scale-125" /></ClientOnly>
		</WrapperIconRound>

		<!-- TODO: super-responsive searchbar with logic -->
		<!-- Search -->
		<WrapperIconRound
			v-if="curUserStore.isAuthenticated"
			class="cursor-pointer p-2"
		>
			<ClientOnly><IconMagnifier class="scale-125" /></ClientOnly>
		</WrapperIconRound>
	</section>
</template>
