<script setup lang="ts">
	useGlobalHotKeys();
</script>

<template>
	<div>
		<NuxtLoadingIndicator />

		<NuxtLayout>
			<NuxtRouteAnnouncer />

			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
