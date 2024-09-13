<script setup>
	const toggleLang = () => console.log(1);
</script>

<template>
	<section class="">
		<h2>Home</h2>

		<p>Current lang: {{ currentLang }}</p>

		<p>...</p>

		<button @click="toggleLang">Toggle lang</button>
	</section>
</template>
