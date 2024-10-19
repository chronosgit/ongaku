<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';
</script>

<template>
	<Default>
		<MyHeader />

		<slot></slot>
	</Default>
</template>
