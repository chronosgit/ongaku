<script setup lang="ts">
	const localePath = useLocalePath();
</script>

<template>
	<div
		class="flex h-screen flex-col items-center justify-center gap-4 dark:bg-black"
	>
		<h1 class="text-3xl font-bold dark:text-white">Oops!</h1>

		<p class="text-lg dark:text-gray-400">
			You have to
			<NuxtLink
				:to="localePath('/auth')"
				class="text-blue-500 transition-colors hover:text-blue-700"
				>authenticate</NuxtLink
			>
			in order to continue
		</p>
	</div>
</template>
