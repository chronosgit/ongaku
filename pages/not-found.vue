<script setup lang="ts">
	import LogoOngaku from '~/components/ui/LogoOngaku.vue';

	definePageMeta({
		title: '/not-found.meta.title',
	});

	const localePath = useLocalePath();
</script>

<template>
	<main
		class="flex min-h-screen flex-col items-center justify-center gap-8 bg-white px-8 dark:bg-[#121212]"
	>
		<LogoOngaku sizes="70" />

		<h1 class="text-center text-4xl font-bold sm:text-5xl dark:text-white">
			{{ $t('/not-found.feedback.title') }}
		</h1>

		<p class="dark:text-[#a7a7a7]">
			{{ $t('/not-found.feedback.message') }}
		</p>

		<NuxtLink
			:to="localePath('/')"
			class="rounded-full bg-black px-7 py-3 font-bold text-white dark:bg-white dark:text-black"
		>
			{{ $t('/not-found.buttons.main') }}
		</NuxtLink>
	</main>
</template>
