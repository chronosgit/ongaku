<script setup lang="ts">
	definePageMeta({
		title: 'My profile',
		layout: 'main',
		middleware: 'protect-route',
	});

	const { profile } = useMyProfile();
</script>

<template>
	<div class="dark:text-white">
		{{ profile }}
	</div>
</template>
