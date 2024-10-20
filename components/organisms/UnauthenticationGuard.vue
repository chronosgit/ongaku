<script setup lang="ts">
	const localePath = useLocalePath();
</script>

<template>
	<div
		class="flex h-screen flex-col items-center justify-center gap-4 dark:bg-black"
	>
		<h1 class="text-3xl font-bold dark:text-white">
			{{ $t('modules.unauthentication-guard.oops') }}
		</h1>

		<p class="text-lg dark:text-gray-400">
			{{ $t('modules.unauthentication-guard.feedback-p1') }}

			<NuxtLink
				:to="localePath('/auth')"
				class="text-blue-500 transition-colors hover:text-blue-700"
			>
				{{ $t('modules.unauthentication-guard.feedback-p2') }}
			</NuxtLink>

			{{ $t('modules.unauthentication-guard.feedback-p3') }}
		</p>
	</div>
</template>
