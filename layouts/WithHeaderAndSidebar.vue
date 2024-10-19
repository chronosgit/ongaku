<script setup lang="ts">
	import Default from '~/layouts/default.vue';
	import MyHeader from '~/components/organisms/MyHeader.vue';
	import LibrarySidebar from '~/components/organisms/LibrarySidebar.vue';
</script>

<template>
	<Default>
		<div class="max-h-screen overflow-hidden">
			<MyHeader />

			<div class="relative h-screen">
				<LibrarySidebar />

				<slot></slot>
			</div>
		</div>
	</Default>
</template>
