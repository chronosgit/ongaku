<script setup>
	import Atom from '~/components/atoms/Atom.vue';

	const a = ref(1);
</script>

<template>
	<section>
		<h1>Home</h1>

		<p>{{ a }}</p>

		<Atom />
	</section>
</template>
