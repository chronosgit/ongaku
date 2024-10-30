<script setup lang="ts">
	import { IconBurgerMenu } from '~/components/ui/icons';
	import WrapperIconRound from '~/components/shared/WrapperIconRound.vue';

	const MobileMenuRight = defineAsyncComponent(
		() => import('~/components/layout/mobile-menu-right/index.vue')
	);

	const { isActive, activate: open } = useClickawayClient(
		'mobile-toggleable-right-menu-ref'
	);
</script>

<template>
	<section>
		<WrapperIconRound class="cursor-pointer p-2" @click="open()">
			<ClientOnly><IconBurgerMenu class="scale-125" /></ClientOnly>
		</WrapperIconRound>

		<MobileMenuRight
			:is-open="isActive"
			ref="mobile-toggleable-right-menu-ref"
			class="md:hidden"
		/>
	</section>
</template>
