<script setup>
	defineI18nRoute(false);

	onMounted(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');

		if (code) {
			window.opener.postMessage({ code }, window.location.origin);
			window.close();
		}
	});
</script>

<template>
	<h1>Redirecting...</h1>
</template>
