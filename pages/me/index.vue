<script setup lang="ts">
	import LayoutPartContainer from '~/components/layout/LayoutPartContainer.vue';

	definePageMeta({
		title: 'My profile',
		layout: 'main',
		middleware: 'protect-route',
	});

	const { profile } = useMyProfile();
</script>

<template>
	<LayoutPartContainer class="h-full">
		<div class="p-2 dark:text-white">
			<div class="dark:text-white">
				{{ profile }}
			</div>
		</div>
	</LayoutPartContainer>
</template>
