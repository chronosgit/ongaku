<script setup lang="ts">
	definePageMeta({ title: '/auth.meta.title' });

	const { locale } = useI18n();

	const { authenticate } = useAuthenticateClient();
</script>

<template>
	<div
		class="flex min-h-screen flex-col items-center justify-center px-4 dark:bg-zinc-900"
	>
		<div class="max-w-80 space-y-16 md:max-w-lg">
			<h1 class="break-words text-center text-5xl font-bold dark:text-white">
				{{ $t('/auth.form.title') }}
			</h1>

			<button
				class="group mx-auto my-0 block space-x-4 rounded-full px-5 py-2 transition-colors hover:bg-indigo-600"
				@click="authenticate()"
			>
				<NuxtImg
					src="/spotify-logo.png"
					sizes="30"
					alt="spotify logo"
					class="inline-block"
				/>

				<p
					class="inline-block font-bold transition-colors group-hover:text-white dark:text-white"
				>
					{{ $t('/auth.buttons.auth') }}
				</p>
			</button>
		</div>

		<p class="my-2 font-bold uppercase text-gray-500">
			{{ $t('/auth.form.or') }}
		</p>

		<NuxtLink
			:to="`/${locale}`"
			class="text-md rounded-full px-4 py-1 font-bold transition-colors hover:bg-indigo-600 hover:text-white dark:text-white"
		>
			{{ $t('/auth.buttons.home') }}
		</NuxtLink>
	</div>
</template>
