<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import LibrarySidebar from '~/components/organisms/LibrarySidebar.vue';
</script>

<template>
	<Default>
		<MyHeader />

		<slot></slot>

		<LibrarySidebar />
	</Default>
</template>
