<script setup lang="ts">
	import TemplateLayoutPart from '~/_migration/shared/LayoutPartContainer.vue';

	definePageMeta({
		title: 'My profile',
		layout: 'main',
		middleware: 'protect-route',
	});

	const { profile } = useMyProfile();
</script>

<template>
	<TemplateLayoutPart class="h-full">
		<div class="p-2 dark:text-white">
			<div class="dark:text-white">
				{{ profile }}
			</div>
		</div>
	</TemplateLayoutPart>
</template>
