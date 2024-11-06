<script setup lang="ts">
	import FlexTextSectionDivider from '~/components/shared/FlexTextSectionDivider.vue';
</script>

<template>
	<FlexTextSectionDivider
		text-class="text-gray-500"
		line-class="border-gray-500"
		class="px-2"
	>
		{{ $t('modules.menu-mobile-right.dividers.search') }}
	</FlexTextSectionDivider>
</template>
