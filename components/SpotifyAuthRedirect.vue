<template>
	<div>Redirecting...</div>
</template>

<script>
	export default {
		mounted() {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get('code');

			if (code) {
				window.opener.postMessage({ code }, window.location.origin);

				window.close();
			}
		},
	};
</script>
